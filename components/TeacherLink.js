// components/TeacherLink.js
import Link from 'next/link'

const TeacherLink = ({ teacher }) => {
  return (
    <Link href={`/teacher/${teacher.id}`} className="teacher-link">
      {teacher.name}
      
      <style jsx>{`
        .teacher-link {
          color: #0066cc;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid transparent;
          transition: border-bottom-color 0.2s;
        }
        
        .teacher-link:hover {
          border-bottom-color: #0066cc;
        }
      `}</style>
    </Link>
  )
}

export default TeacherLink 