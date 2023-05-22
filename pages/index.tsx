import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react'
import { options, languages, programmingTasks, writingTasks, websiteTasks } from '@/components/utils'
import { OptionSelect, TextArea, Result, Loading, Error } from '@/components/sections'
import { Footer } from '@/components/footer'
import axios from 'axios'
import { Button } from '@/components/button'
import { Message } from '@/components/message'

export default function Home() {
  const [value, setValue] = useState('')
  const [option, setOption] = useState('')
  const [language, setLanguage] = useState('')
  const [task, setTask] = useState('')
  const [number, setNumber] = useState('1') // default number of comparison
  const [result, setResult] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const maxCharCount = 1000; // max char count for the textarea
  const siteName = 'Dealing with AI';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setResult('');
    setLoading(true);

    try {
      // Check internet connectivity before making the API request
      if (!navigator.onLine) {
        setError('No internet connection');
        setLoading(false);
        return;
      }

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
      );
      setError('');
      setResult(data.data);
    
    } catch (error: any) {
      setError(error.message);
    
    } finally {
      setLoading(false);
    }
  };

  // use ref to scroll to bottom
  const resultRef = useRef<HTMLDivElement>(null)

  // scroll to bottom
  useEffect(() => {
    if (resultRef.current) {

    }
  }, [result])

  return (
    <>
      <Head>
        <title>Dealing with AI</title>
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
              <OptionSelect
                label="What do you want to do?"
                value={option}
                onChange={(e) => {
                  setOption(e.target.value)
                  setResult('')
                }}
                options={options}
              />
              {option === 'programming' && (
                <OptionSelect
                  label="What language?"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value)
                    setResult('')
                  }}
                  options={languages}
                />
              )}
              {option === 'programming' && (
                <OptionSelect
                  label="What task?"
                  value={task}
                  onChange={(e) => {
                    setTask(e.target.value)
                    setResult('')
                  }}
                  options={programmingTasks}
                />
              )}
              {option === 'compare review papers' && (
                <OptionSelect
                  label="How many comparison?"
                  value={number}
                  onChange={(e) => {
                    setNumber(e.target.value)
                    setResult('')
                  }}
                  options={Array.from({ length: 100 }, (_, i) => (i + 1).toString())}
                />
              )}
              {option === 'writing' && (
                <OptionSelect
                  label="What task?"
                  value={task}
                  onChange={(e) => {
                    setTask(e.target.value)
                    setResult('')
                  }}
                  options={writingTasks}
                />
              )}
              {option === 'website' && (
                <OptionSelect
                  label="What task?"
                  value={task}
                  onChange={(e) => {
                    setTask(e.target.value)
                    setResult('')
                  }}
                  options={websiteTasks}
                />
              )}
              <div className="flex flex-col justify-center w-full mx-10 md:px-20">
                <TextArea
                  label="Type your problem"
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setValue(e.target.value);
                    setCharCount(e.target.value.length);
                  }}
                  charCount={charCount}
                />
                <Message
                  charCount={charCount}
                  maxCharCount={maxCharCount}
                />
                <Button
                  classCondition={charCount > maxCharCount || charCount === 0 || loading || error ? true : false}
                  ariaLabel="Generate"
                  name="Generate"
                  disabled={!!(charCount > maxCharCount || charCount === 0 || loading || error)}
                />
              </div>
            </form>
          </div>
          <Result result={result} resultRef={resultRef} />
          <Loading loading={loading} />
          <Error error={error} />
        </main>
        <Footer
          siteName={siteName}
          authorName="Saurav Hathi"
          githubLink="https://github.com/sauravhathi/dealing-with-ai"
          authorImage="https://avatars.githubusercontent.com/u/61316762?v=4"
        />
      </div>
    </>
  )
}
