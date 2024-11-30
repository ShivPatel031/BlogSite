import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Container, SiteLogo} from '../index.js'

function Footer() {

    
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="py-8 text-center text-gray-500">
            <p>&copy; 2024 BlogSite. All rights reserved.</p>
          </div>
        </Container>
    </footer>
  )
}

export {Footer}