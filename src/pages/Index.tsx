
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookForm from '@/components/BookForm';
import BookTable from '@/components/BookTable';
import { Book } from '@/types/book';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { toast } = useToast();

  // Load books from localStorage on component mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('bookstore-books');
    if (savedBooks) {
      try {
        const parsedBooks = JSON.parse(savedBooks);
        setBooks(parsedBooks);
      } catch (error) {
        console.error('Error loading books from localStorage:', error);
      }
    }
  }, []);

  // Save books to localStorage whenever books array changes
  useEffect(() => {
    localStorage.setItem('bookstore-books', JSON.stringify(books));
  }, [books]);

  const handleAddBook = (newBook: Book) => {
    // Check if ISBN already exists
    const existingBook = books.find(book => book.isbn === newBook.isbn);
    if (existingBook) {
      toast({
        title: "Book Already Exists",
        description: `A book with ISBN ${newBook.isbn} is already in your store.`,
        variant: "destructive",
      });
      return;
    }

    setBooks(prevBooks => [...prevBooks, newBook]);
    toast({
      title: "Book Added Successfully",
      description: `"${newBook.title}" by ${newBook.author} has been added to your store.`,
    });
  };

  const handleRemoveBook = (bookId: string) => {
    const bookToRemove = books.find(book => book.id === bookId);
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
    
    if (bookToRemove) {
      toast({
        title: "Book Removed",
        description: `"${bookToRemove.title}" has been removed from your store.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Welcome to Your Digital Bookstore
            </h2>
            <p className="text-slate-600">
              Add, manage, and organize your book inventory with our intuitive management system
            </p>
          </div>
          
          <BookForm onAddBook={handleAddBook} />
          <BookTable books={books} onRemoveBook={handleRemoveBook} />
          
          {books.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-md border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Store Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{books.length}</div>
                  <div className="text-sm text-blue-700">Total Books</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${books.reduce((total, book) => total + book.price, 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-green-700">Total Value</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-600">
                    ${books.length > 0 ? (books.reduce((total, book) => total + book.price, 0) / books.length).toFixed(2) : '0.00'}
                  </div>
                  <div className="text-sm text-amber-700">Average Price</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
