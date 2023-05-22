import React, { } from 'react'
import { FaGithub } from 'react-icons/fa'
import Image from 'next/image'

export const Footer = ({ siteName, authorName, githubLink, authorImage }: { siteName: string, authorName: string, githubLink: string, authorImage: string }) => (
    <footer className="flex items-center justify-center w-full h-16 border-t mt-5">
        <a
            className="flex items-center justify-center gap-2"
            href={githubLink}
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
                src={authorImage}
                alt={authorName}
                width={30}
                height={30}
                className="rounded-full"
            />
            <span className=" text-gray-500">
                {authorName}
            </span>
            <span className=" text-gray-500">
                {new Date().getFullYear()}
            </span>
        </a>
    </footer>
)