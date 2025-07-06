
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Book } from '@/types/book';

interface BookFormProps {
  onAddBook: (book: Book) => void;
}

const BookForm = ({ onAddBook }: BookFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    isbn: '',
    price: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.year || !formData.isbn || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    const newBook: Book = {
      id: Date.now().toString(),
      title: formData.title,
      author: formData.author,
      year: parseInt(formData.year),
      isbn: formData.isbn,
      price: parseFloat(formData.price)
    };

    onAddBook(newBook);
    setFormData({ title: '', author: '', year: '', isbn: '', price: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mb-8 shadow-lg border-amber-200">
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
        <CardTitle className="flex items-center gap-2 text-amber-900">
          <Plus className="h-5 w-5" />
          Add New Book
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-slate-700 font-medium">Book Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
                className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div>
              <Label htmlFor="author" className="text-slate-700 font-medium">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
                className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div>
              <Label htmlFor="year" className="text-slate-700 font-medium">Publication Year</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div>
              <Label htmlFor="isbn" className="text-slate-700 font-medium">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="978-0-123456-78-9"
                className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="price" className="text-slate-700 font-medium">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="29.99"
                className="mt-1 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Book to Store
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookForm;
