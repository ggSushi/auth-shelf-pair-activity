import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  // const [shelfItem, setShelfItem] = useState([]);
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addItem = () => {
    axios.post('/api/shelf', {
      description: description,
      image_url: imgUrl
    }).then((result) => {
      console.log(`result:`, result.data);
      fetchShelf();
    }).catch((error) => {
      console.log(`Error in POST: ${error}`);
      alert(`Get that offa the shelf!`);
    })
  } // end of addItem();

  const deleteItem = (id) => {
    console.log(id)
    axios.delete(`/api/shelf/${id}`).then(res => {
      fetchShelf();
    }).catch(error => {
      console.log(`Error in deleteItem: ${error}`);
    });
  } // end of deleteItem();

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
    console.log(description)
  } // end of hendleDescriptionChange();

  const handleImgChange = (event) => {
    setImgUrl(event.target.value)
    console.log(imgUrl)
  } // end of handleImgChange

  return (
    <div className="container">
      <h2>Add Item</h2>
      <form onSubmit={addItem}>
        <input onChange={handleDescriptionChange} type="text" placeholder="description" />
        <input onChange={handleImgChange} type="text" placeholder="image" />
        <input type="submit" />
      </form>
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
            <div className="gallery">
              <img src={item.image_url} alt={item.description} />
              <br />
              <div className="desc">{item.description}</div>
              <div style={{ textAlign: 'center', padding: '5px' }}>
                <button onClick={() => deleteItem(item.id) } style={{ cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
