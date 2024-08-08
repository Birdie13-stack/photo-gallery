import React, { useEffect, useState } from 'react'

function PhotoGallery() {

const [images, setImages] = useState([])
const [loading, setLoading] = useState(false);

useEffect(() => {
    fetchImages()
}, [])

const fetchImages = () => {
    setLoading(true);

    fetch(`https://api.unsplash.com/photos/random?count=20&client_id=QVJfhMFTCwh9XgcB145ieglkskKSCDMIRtx5pvlRqjA`)
    .then((res) => {
        if(!res.ok) {
            throw new Error("Network response was not ok.")
        } 
        return res.json()
    })
    .then((data) => {
        setImages(data)
    })
    .catch((error) => {
        console.error("Error fetching images:", error)
    })
    .finally(() => {
        setLoading(false)
    })
}
  return (
    <div className="photo-gallery">
         {loading && <p>Loading images...</p>}
         {/* {error && <p className="error">{error}</p>} */}
      {images.map((image) => (
        <div key={image.id} className="photo-card">
          <img src={image.urls.small} alt={image.alt_description} />
          <p className="photo-photographer">Photographer: {image.user.name}</p>
        </div>
      ))}
    </div>
  )
}

export default PhotoGallery