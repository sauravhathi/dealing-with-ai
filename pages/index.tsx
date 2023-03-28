import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react'
import { FaCheck, FaExclamationTriangle, FaGithub, FaSpinner } from 'react-icons/fa'
import Image from 'next/image'
import axios from 'axios'

export default function Home() {
  const [value, setValue] = useState('')
  const [option, setOption] = useState('')
  const [language, setLanguage] = useState('')
  const [task, setTask] = useState('')
  const [number, setNumber] = useState('1')
  const [result, setResult] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const maxCharCount = 1000;
  const siteName = 'Dealing with AI'

  // options list
  const options = [
    'sentence correction',
    'paraphraser',
    'report making',
    'table of content',
    'compare review papers',
    'apa citation',
    'math',
    'programming',
    'writing',
    'website',
  ]
  // language list
  const languages = [
    'C++',
    'C#',
    'C',
    'Java',
    'Python',
    'JavaScript',
    'PHP',
    'Ruby',
    'Swift',
    'Go',
    'Rust',
    'Kotlin',
    'Dart',
    'Scala',
    'Perl',
    'R programming',
    'SQL',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Bootstrap',
    'Sass',
    'excel',
    'word',
    'powerpoint',
  ]

  // programming task
  const programmingTasks = [
    'explain',
    'solve',
    'step by step explanation',
    'add comments',
    'add documentation',
    'add tests',
    'complexity',
    `time complexity`,
    `space complexity`,
    'code review',
    'code optimization',
    'code refactoring',
    'code formatting',
    'code beautification',
    'code debugging',
  ]

  // writing task
  const writingTasks = [
    'letter',
    'essay',
    'mail',
    'cover letter',
    'cv',
    'resume',
  ]

  // website task
  const websiteTasks = [
    'keywords',
    'robots.txt',
    'sitemap.xml',
    'description',
    'title',
    'slogan',
    'tagline',
  ]

  // handle submit form data to backend api and get result from backend api and set result to state and error to state and loading to state
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResult('');
    setLoading(true);
    try {
      const { data } = await axios.post(
        'v1/api/dealingWithAI',
        {
          value,
          option,
          language,
          task,
          number,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      setError('');
      setResult(data.data);
      setLoading(false);
    } catch (error: any) {
      setResult('');
      setError(error.response.data.error);
      setLoading(false);
    }
  }

  // use ref to scroll to bottom
  const resultRef = useRef<HTMLDivElement>(null)

  // scroll to bottom
  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [result])

  return (
    <>
      <Head>
        <title>Dealing with AI</title>
        <meta name="description" content="Dealing with AI" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={`${siteName} is a website that offers AI-powered writing assistance and language processing tools to help you with a variety of tasks. Our services include sentence correction, paraphrasing, report writing, math problem solving, programming tasks, and more. We can also help optimize your website with SEO tools such as keywords, robots.txt, sitemap.xml, descriptions, titles, slogans, and taglines to improve your search engine ranking. Let Dealing with AI help you achieve your writing and website optimization goals.`} />
        <meta name="keywords" content="programming tasks, code review and optimization, writing assistance for letters, essays, and resumes, website optimization and SEO, chat-gpt, openai, AI-powered writing assistance, Language processing tools, Sentence correction, Paraphrasing, Report writing, Math problem solving" />
        <meta name="author" content="Saurav Hathi" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full">
          <div className="text-center">
            <h1 className="text-5xl font-bold">{siteName}</h1>
            <p className="t-2 mt-5">{siteName} is a free tool that helps you to solve your problems with AI.</p>
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-1">
              <div className="selection">
                <label className="t-2 "
                >What do you want to do?</label>
                <select
                  onChange={(e) => {
                    setOption(e.target.value)
                    setResult('')
                  }
                  }
                >
                  <option value="">Select an option</option>
                  {options.map((option, index) => (
                    <option key={index} value={option} aria-label={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              {option === 'programming' && (
                <div className="selection">
                  <label className="t-2 ">What language?</label>
                  <select
                    onChange={(e) => {
                      setLanguage(e.target.value)
                      setResult('')
                    }
                    }
                  >
                    <option value="">Select a language</option>
                    {languages.map((language, index) => (
                      <option key={index} value={language} aria-label={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {option === 'programming' && (
                <div className="selection">
                  <label className="t-2 ">What task?</label>
                  <select
                    onChange={(e) => {
                      setTask(e.target.value)
                      setResult('')
                    }
                    }
                  >
                    <option value="">Select a task</option>
                    {programmingTasks.map((task, index) => (
                      <option key={index} value={task} aria-label={task}>
                        {task}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {option === 'compare review papers' && (
                <div className="selection">
                  <label className="t-2 ">How many comparison?</label>
                  <select
                    onChange={(e) => {
                      setNumber(e.target.value)
                      setResult('')
                    }
                    }
                  >
                    <option value="">Select a number</option>
                    {Array.from({ length: 100 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {option === 'writing' && (
                <div className="selection">
                  <label className="t-2 ">What task?</label>
                  <select
                    className="w-96 h-10 mt-2 t-2 "
                    onChange={(e) => {
                      setTask(e.target.value)
                      setResult('')
                    }
                    }
                  >
                    <option value="">Select a task</option>
                    {writingTasks.map((task, index) => (
                      <option key={index} value={task} aria-label={task}>
                        {task}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {option === 'website' && (
                <div className="selection">
                  <label className="t-2 ">What task?</label>
                  <select
                    className="w-96 h-10 mt-2 t-2 "
                    onChange={(e) => {
                      setTask(e.target.value)
                      setResult('')
                    }
                    }
                  >
                    <option value="">Select a task</option>
                    {websiteTasks.map((task, index) => (
                      <option key={index} value={task} aria-label={task}>
                        {task}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex flex-col justify-center w-full mx-10 md:px-20">
                <label className="t-2 ">Type your problem</label>
                <textarea
                  onChange={(e) => {
                    setValue(e.target.value)
                    setCharCount(e.target.value.length)
                  }
                  }
                  rows={10}
                  aria-label="Type your problem"
                />
                <p className="t-2 mt-2 ">
                  {<span className={charCount > maxCharCount ? "text-red-500" : ""}>{charCount}</span>} / {maxCharCount}
                </p>
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ${charCount > maxCharCount || charCount === 0 || loading || error ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={!!(charCount > maxCharCount || charCount === 0 || loading || error)}
                  aria-label="Generate"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
          {
            result &&
            <div className="flex flex-col justify-center w-full mx-10 md:px-20" ref={resultRef}>
              <label className="t-2 inline-flex items-center gap-1"><FaCheck className="text-green-500" /> Result</label>
              <textarea
                readOnly
                value={result}
                rows={10}
                cols={50}
                aria-label="Result"
              />
            </div>
          }
          {
            loading &&
            <p className="p-l-r text-blue-500">
              <FaSpinner className="animate-spin" /> Loading...
            </p>
          }
          {
            error &&
            <p className="p-l-r text-red-500">
              <FaExclamationTriangle className="text-red-500" /> {error}
            </p>
          }
        </main>
        <footer className="flex items-center justify-center w-full h-16 border-t mt-5">
          <a
            className="flex items-center justify-center gap-2"
            href="https://github.com/sauravhathi/dealing-with-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-gray-500 text-2xl" />
            <span className=" text-gray-500">
              {siteName}
            </span>
            <span className=" text-gray-500">
              by
            </span>
            <Image
              src="https://avatars.githubusercontent.com/u/61316762?v=4"
              alt="Saurav Hathi"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className=" text-gray-500">
              Saurav Hathi
            </span>
            <span className=" text-gray-500">
              {new Date().getFullYear()}
            </span>
          </a>
        </footer>
      </div>
    </>
  )
}
