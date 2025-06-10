// pages/class/[id].js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import TeacherLink from '../../components/TeacherLink'
import { supabase } from '../../lib/supabase'

export default function ClassDetail() {
  const router = useRouter()
  const { id } = router.query
  const [classData, setClassData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchClass()
    }
  }, [id])

  const fetchClass = async () => {
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
        .eq('id', id)
        .single()

      if (error) throw error
      setClassData(data)
    } catch (error) {
      console.error('Error fetching class:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading class details...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!classData) return <div className="error">Class not found</div>

  return (
    <>
      <Head>
        <title>{classData.title} - Class Details</title>
        <meta name="description" content={classData.description} />
      </Head>

      <main className="main">
        <div className="container">
          <div className="class-detail">
            <div className="image-section">
              <Image 
                src={classData.image_url} 
                alt={classData.title}
                width={600}
                height={400}
                className="class-image"
              />
            </div>
            
            <div className="content-section">
              <h1 className="class-title">{classData.title}</h1>
              <p className="class-description">{classData.description}</p>
              
              <div className="teacher-section">
                <span className="instructor-label">Instructor: </span>
                <TeacherLink teacher={classData.teachers} />
              </div>
            </div>
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
          max-width: 800px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .class-detail {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .image-section {
          position: relative;
          width: 100%;
          height: 400px;
        }
        
        .class-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .content-section {
          padding: 2rem;
        }
        
        .class-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #333;
        }
        
        .class-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #555;
          margin-bottom: 2rem;
        }
        
        .teacher-section {
          font-size: 1.1rem;
        }
        
        .instructor-label {
          font-weight: 600;
          color: #333;
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
          .class-title {
            font-size: 2rem;
          }
          
          .content-section {
            padding: 1.5rem;
          }
          
          .image-section {
            height: 300px;
          }
        }
      `}</style>
    </>
  )
}