import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then((resp) => resp.json())
      .then((res) => {
        setData(res.results);
        setLoading(false);
      });
  }, [offset]);
  return (
    <div className='App'>
      <div className='container'>
        {data ? (
          data.map((v, i) => {
            return (
              <div className='pokemon button'>
                <p>{v.name}</p>
              </div>
            );
          })
        ) : (
          <p>No pokemon</p>
        )}
      </div>
      <div className='pagination'>
        <button
          className='button'
          disabled={page === 1 || loading}
          onClick={() => {
            setPage(page === 1 ? 1 : page - 1);
            setOffset(offset - 20);
          }}
        >
          Prev
        </button>
        <button
          className='button'
          onClick={() => {
            setPage(page + 1);
            setOffset(offset + 20);
          }}
        >
          Next
        </button>
      </div>
      <p className='page-number'>Page {page}</p>
    </div>
  );
}

export default App;
