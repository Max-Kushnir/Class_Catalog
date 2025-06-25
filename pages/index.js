// pages/index.js
import { useState, useEffect } from 'react'
import Head from 'next/head'
import ClassCard from '../components/ClassCard'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchClasses()
  }, [])

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          teachers (
            id,
            name,
            description
          )
        `)
        .order('created_at', { ascending: true })

      if (error) throw error
      setClasses(data)
    } catch (error) {
      console.error('Error fetching classes:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading classes...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <>
      <Head>
        <title>Class Catalog</title>
        <meta name="description" content="Browse our available classes" />
      </Head>

      <main className="main">
        <div className="container">
          <h1 className="title">Class Catalog</h1>
          <p className="subtitle">Discover amazing classes taught by expert instructors</p>
          
          <div className="classes-grid">
            {classes.map((classItem) => (
              <ClassCard key={classItem.id} classItem={classItem} />
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        .main {
          min-height: 100vh;
          padding: 2rem 0;
          background-color: #f8f9fa;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .title {
          font-size: 2.5rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.5rem;
          color: #333;
        }
        
        .subtitle {
          font-size: 1.1rem;
          text-align: center;
          color: #666;
          margin-bottom: 3rem;
        }
        
        .classes-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        
        .loading, .error {
          text-align: center;
          padding: 2rem;
          font-size: 1.1rem;
        }
        
        .error {
          color: #dc3545;
        }
        
        @media (max-width: 768px) {
          .title {
            font-size: 2rem;
          }
          
          .classes-grid {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  )
}