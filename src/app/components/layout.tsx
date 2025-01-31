"use client";

import { client } from '@/config/apoloClient'
import { ApolloProvider } from '@apollo/client'
import React, {  } from 'react'

interface IProps {
    children: React.ReactNode
}

const Layout = ({ children }: IProps) => {
  return (
    <ApolloProvider client={client}>
        {children}
    </ApolloProvider>
  )
}

export default Layout