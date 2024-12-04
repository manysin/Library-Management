"use client";
import { useState } from "react";
import data from "../mock/data.json";
import Image from "next/image";
import AddModel from "../../components/AddModel";
export default function Booklists() {
  const [books, setBook] = useState(data.data);
  const [isModel,setIsModel] = useState(false);

  const[ title,setTitle] = useState("");
  const[ author, setAuthor] = useState("");
  const[ publicationDate, setPublicationDate] = useState("");
  const[description,setDescription] = useState("");
  const[ genre, setGenre] = useState("");
  const[ coverImage,setCoverImage ] = useState("");
  const[id,setId] = useState('');
  const[isUpdate,setIsUpdate] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "publicationDate":
        setPublicationDate(value);
        break;
      case "genre":
        setGenre(value);
        break;
      case "coverImage":
        setCoverImage(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };
  function addToList() {
    // Check if any required field is empty
    if (!title.trim() || !author.trim() || !publicationDate.trim() || !genre.trim() || !description.trim() || !coverImage.trim()) {
      alert("All fields must be filled out.");
      return; // Stop execution if any field is empty
    }
  
    const newBook: Book = {
      id: books.length + 1, // Ensure unique ID
      title,
      author,
      publicationDate,
      genre,
      description,
      coverImage,
    };
  
    // Add the new book to the list
    setBook((prevItems) => [...prevItems, newBook]);
  

    popUpHandler();
  }
  function addBook(){
    setIsUpdate(0);
    popUpHandler();
  }
  const popUpHandler = () => {
    if(isModel){
          // Clear the input fields
    setTitle("");
    setAuthor("");
    setPublicationDate("");
    setGenre("");
    setDescription("");
    setCoverImage("");
    }
    setIsModel((prevState) => !prevState); // Toggle modal state
  };
  const deleteBook = (id: number) => {
    // Find the index of the book with the given id
    const index = books.findIndex((item) => item.id === id);
  
    if (index !== -1) {
      // Create a new array without the book at the found index
      const updatedBooks = books.filter((item) => item.id !== id);
  
      // Update the state with the new array
      setBook(updatedBooks);
  
      alert("Book deleted successfully.");
    } else {
      alert("Book not found.");
    }
  };
  
  function bookEdit(id){
    setIsUpdate(1);
    popUpHandler();
    const bookToEdit = books.find((book) => book.id === id);
    if (bookToEdit) {
      setId(id);
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setPublicationDate(bookToEdit.publicationDate);
      setGenre(bookToEdit.genre);
      setDescription(bookToEdit.description);
      setCoverImage(bookToEdit.coverImage);
    }
  }
  function saveEdit(id){
    const bookToEdit  =  books.find((book)=>book.id == id);
    if (!title.trim() || !author.trim() || !publicationDate.trim() || !genre.trim() || !description.trim() || !coverImage.trim()) {
      alert("All fields must be filled out.");
      return;
    }
  
    const updatedBooks = books.map((book) =>
      book.id === id
        ? { ...book, title, author, publicationDate, genre, description, coverImage }
        : book
    );

    setBook(updatedBooks);

    popUpHandler();

  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {
          isModel && (<AddModel isUpdate={isUpdate} addToList={addToList} id={id} popUpHandler={popUpHandler} saveEdit={saveEdit} title={title}
            author={author}
            publicationDate={publicationDate}
            genre={genre}
            coverImage={coverImage}
            description={description}
            handleChange={handleChange} />)
        }
        
      <div className="flex items-center flex-wrap md:flex-row space-y-4 py-5 px-5 justify-end md:space-y-0  bg-white dark:bg-gray-900">
        <button onClick={()=>{addBook()}} className="inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Add Book
                    </span>
        </button>
        </div>
       <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                CoverImage
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                PublicationDate
              </th>
              <th scope="col" className="px-6 py-3">
                Genre
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">{book.id}</td>
                  <td className="px-6 py-4">
                  <Image
                      className="w-20 h-20 rounded-lg object-contain"
                      src={`/bookImages/${book.coverImage}`}
                      alt="user photo"
                      width={10}
                      height={10}
                    />
                    
                  </td>
                  <td className="px-6 py-4">
                    {book.title}
                  </td>
                  <td className="px-6 py-4">
                    {book.author}
                  </td>
                  <td className="px-6 py-4">
                    {book.publicationDate}
                  </td>
                  <td className="px-6 py-4">
                    {book.genre}
                  </td>
                  <td className="px-6 py-4 line-clamp-2 overflow-hidden h-14"width={300}>
                    {book.description}
                  </td>
                  <td className="px-6 py-4 ">
                  <button className="relative flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400" onClick={()=>{bookEdit(book.id)}}>
                  <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  EDIT
                  </span>
                  </button>
                  <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" onClick={()=>{deleteBook(book.id)}}>
                  <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  DELETE
                  </span>
                  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
