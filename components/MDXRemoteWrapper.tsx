'use client';

import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

interface MDXRemoteWrapperProps {
  source: MDXRemoteSerializeResult;
}

export default function MDXRemoteWrapper({ source }: MDXRemoteWrapperProps) {
  return <MDXRemote {...source} />;
}