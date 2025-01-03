import React, { useState } from 'react'
import Select from 'react-select';
import axios from 'axios';
import './Home.css'
function Home() {
    const genre = [
        {
            label : 'Design',
            value : 'Design'
        },
        {
            label : 'Lifestyle',
            value : 'Lifestyle'
        },
        {
            label : 'Business',
            value : 'Business'
        },
        {
            label : 'Development',
            value : 'Development'
        }
    ];

    const [selectedGenre, setSelectedGenre] = useState('');
    const [podcasts, setPodcasts] = useState([]);

    const handleSubmit = () => {
        if(selectedGenre){
            const selectedValues = Array.isArray(selectedGenre) 
                ? selectedGenre.map(option => option.value) 
                : [selectedGenre.value];

            axios.get(`http://localhost:1000/podcasts?category=${selectedGenre.value}`, { params: { category: selectedValues }})
            .then((res) => {    
                setPodcasts(res.data);
                console.log('success')
            })
            .catch((e) => {
                console.log(`Are ${e}`)
            })
        }
    }

    const handleChange = (selectedOption) => {
        // e.preventDefault();
        setSelectedGenre(selectedOption);
    }

  return (
    <div className='homepage'>
        <div className='search-bar'>
        <Select options={genre} isMulti={true} onChange={handleChange}/>
        <button onClick={handleSubmit}> Search </button>
    </div>
    
    <div className='podcastContent'>
        <ul>
            {podcasts.length > 0 ? (
                podcasts.map((podcast) => (
                    <li key={podcast._id}>
                        <h3>{podcast.name}</h3>
                        <p>{podcast.description}</p>
                        <p><strong>Category:</strong> {podcast.category}</p>
                        <a href={podcast.source} target="_blank" rel="noopener noreferrer">Listen Now</a>
                        <br/>
                        <a href={podcast.itunes} target="_blank" rel="noopener noreferrer">Listen Now on iTunes</a>
                        {/* <a href={podcast.source} target="_blank" rel="noopener noreferrer">Listen Now on </a> */}
                    </li>
                ))
            ) : (
                <li>No genres selected</li>
            )}
        </ul>
    </div>


        {/* <div className='podcastContent'>
            <ul>
                {
                    (podcasts.length > 0) 
                    ? 
                    (podcasts.map((genre) => (
                        <li> {genre.name} </li>
                    )))
                    :
                    (
                        <li>No genres selected</li>
                    )
                }
            </ul>
        </div> */}

    </div>
  )
}

export default Home