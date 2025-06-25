// components/ClassCard.js
import Link from 'next/link'
import Image from 'next/image'

const ClassCard = ({ classItem }) => {
  return (
    <div className="class-card">
      <Link href={`/class/${classItem.id}`} target="_blank" rel="noopener noreferrer">
        <div className="class-card-content">
          <div className="image-container">
            <Image 
              src={classItem.image_url} 
              alt={classItem.title}
              width={400}
              height={250}
              className="class-image"
            />
          </div>
          <div className="class-info">
            <h3 className="class-title">{classItem.title}</h3>
            <p className="class-description">{classItem.description}</p>
          </div>
        </div>
      </Link>
      
      <style jsx>{`
        .class-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          max-width: 400px;
          margin: 16px;
        }
        
        .class-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .class-card-content {
          text-decoration: none;
          color: inherit;
        }
        
        .image-container {
          position: relative;
          width: 100%;
          height: 250px;
        }
        
        .class-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .class-info {
          padding: 16px;
        }
        
        .class-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #333;
        }
        
        .class-description {
          font-size: 0.95rem;
          color: #666;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </div>
  )
}

export default ClassCard