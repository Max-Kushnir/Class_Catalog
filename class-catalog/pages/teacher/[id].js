// pages/teacher/[id].js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default function TeacherProfile() {
  const router = useRouter()
  const { id } = router.query
  const [teacher, setTeacher] = useState(null)
  const [teacherClasses, setTeacherClasses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchTeacher()
      fetchTeacherClasses()
    }
  }, [id])

  const fetchTeacher = async () => {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      setTeacher(data)
    } catch (error) {
      console.error('Error fetching teacher:', error)
      setError(error.message)
    }
  }

  const fetchTeacherClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .eq('teacher_id', id)

      if (error) throw error
      setTeacherClasses(data)
    } catch (error) {
      console.error('Error fetching teacher classes:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Loading teacher profile...</div>
  if (error) return <div className="error">Error: {error}</div>
  if (!teacher) return <div className="error">Teacher not found</div>

  return (
    <>
      <Head>
        <title>{teacher.name} - Teacher Profile</title>
        <meta name="description" content={teacher.description} />
      </Head>

      <main className="main">
        <div className="container">
          <div className="teacher-profile">
            <div className="profile-header">
              <div className="profile-avatar">
                {teacher.name.charAt(0)}
              </div>
              <h1 className="teacher-name">{teacher.name}</h1>
            </div>
            
            <div className="profile-content">
              <section className="about-section">
                <h2>About {teacher.name}</h2>
                <p className="teacher-description">{teacher.description}</p>
              </section>
              
              {teacherClasses.length > 0 && (
                <section className="classes-section">
                  <h2>Classes by {teacher.name}</h2>
                  <div className="classes-list">
                    {teacherClasses.map((classItem) => (
                      <Link 
                        key={classItem.id} 
                        href={`/class/${classItem.id}`}
                        className="class-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="class-item">
                          <h3>{classItem.title}</h3>
                          <p>{classItem.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
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
        
        .teacher-profile {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .profile-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .profile-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 2rem;
          font-weight: bold;
          color: white;
        }
        
        .teacher-name {
          font-size: 2.5rem;
          font-weight: 700;
          color: #333;
          margin: 0;
        }
        
        .profile-content {
          text-align: left;
        }
        
        .about-section {
          margin-bottom: 2rem;
        }
        
        .about-section h2,
        .classes-section h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e9ecef;
        }
        
        .teacher-description {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #555;
        }
        
        .classes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .class-link {
          text-decoration: none;
          color: inherit;
        }
        
        .class-item {
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .class-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .class-item h3 {
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #333;
        }
        
        .class-item p {
          margin: 0;
          color: #666;
          line-height: 1.5;
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
          .teacher-name {
            font-size: 2rem;
          }
          
          .teacher-profile {
            padding: 1.5rem;
          }
        }
      `}</style>
    </>
  )
}