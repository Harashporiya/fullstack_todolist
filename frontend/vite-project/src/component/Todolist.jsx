import React, { useEffect, useState} from 'react';
import axios from 'axios';


function Todolist() {
  const [content, setContent] = useState([]);
  const [inputValue, setInputValue] = useState('');
//   const [deletetodo, setdeletetodo] = useState('');


 useEffect(()=>{
    const fetchTodos = async () => {
        try {
          const response = await axios.get('http://localhost:8001/todo/todolist'); 
          setContent(response.data);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };
    fetchTodos();
 },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8001/todo/todolist', {
        content: inputValue,
      });
      console.log(response.data);
      setContent([...content, { content: inputValue }]);
      setInputValue('');
    } catch (error) {
      console.log('Fetching Error', error);
    }
  };

  const handleDelete = async(Id)=>{
    try{
       await axios.delete(`http://localhost:8001/todo/delete/${Id}`);
          setContent(content.filter(contents=>contents._id !== Id));
       
    }catch(error){
        console.error("Error", error);
    }
  }

  return (
    <>
    
    <div className='bg-blue-900 min-h-screen'>
      <p className='flex justify-center pt-12 text-white text-4xl font-black'>TO-DO-LIST</p>
      <div className=' flex justify-center pt-10'>
      <div className=' p-4'>
        <form onSubmit={handleSubmit} className='flex'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Enter the text'
            className='rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white'
          />
          <button
            type='submit'
            className='px-4 rounded-r-lg bg-blue-500 text-white border border-blue-500 border-l-0'
          >
            Submit
          </button>
        </form>
        <div className='pt-10'>
          {content.map((item, index) => (
            <div className='bg-gray-900 w-full rounded-md mb-2 p-2' key={index}>
              <p className='text-blue-500 p-2 font-semibold text-2xl ' >{item.content}</p>
              < hr className='text-gray-900'/>
              <div className='pt-2' onClick={()=>handleDelete(item._id)}>
                <button className='bg-red-600 h-12 rounded-lg  mr-0 p-2 text-xl  text-white font-semibold'>Delete</button>
                </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
    </>
  );
}

export default Todolist;
