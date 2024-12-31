import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import axios from 'axios';
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

    useEffect(() => {
        axios.get('linkk')
        .then((req, res) => {
            res.json();
        })
        .then((data) => {
            setPodcasts(data);
        })
        .catch((e) => {
            console.log(`error ${e}`);
        })
    }, [selectedGenre]);

    const handleChange = (e) => {
        e.preventDefault();
        setSelectedGenre(e.target.value);
    }

    const handleSubmit = () => {

    }
  return (
    <div className='homepage'>
        <div className='search-bar'>
        <Select options={genre} isMulti onChange={handleChange}/>
        <button onClick={handleSubmit}> Search </button>
        </div>

        <div className='podcastContent'>
            <ul>
                {
                    (podcasts.length > 0) 
                    ? 
                    (podcasts.map((genre) => (
                        <li key={genre.value}> {genre.label} </li>
                    )))
                    :
                    (
                        <li>No genres selected</li>
                    )
                }
            </ul>
        </div>

    </div>
  )
}

export default Home