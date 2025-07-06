
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Trash2, Search, BookOpen } from 'lucide-react';
import { Book } from '@/types/book';

interface BookTableProps {
  books: Book[];
  onRemoveBook: (id: string) => void;
}

const BookTable = ({ books, onRemoveBook }: BookTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="w-full shadow-lg border-slate-200">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
        <CardTitle className="flex items-center gap-2 text-slate-800">
          <BookOpen className="h-5 w-5" />
          Book Inventory ({books.length} books)
        </CardTitle>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search books by title, author, or ISBN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">
              {books.length === 0 ? 'No books in your store yet' : 'No books match your search'}
            </p>
            <p className="text-sm">
              {books.length === 0 ? 'Add your first book using the form above' : 'Try adjusting your search terms'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b border-slate-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Book Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Author</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Year</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">ISBN</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Price</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, index) => (
                  <tr key={book.id} className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-25'}`}>
                    <td className="py-3 px-4 font-medium text-slate-800">{book.title}</td>
                    <td className="py-3 px-4 text-slate-600">{book.author}</td>
                    <td className="py-3 px-4 text-slate-600">{book.year}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-sm">{book.isbn}</td>
                    <td className="py-3 px-4 text-slate-600 font-semibold">${book.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Book</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove "{book.title}" by {book.author} from your bookstore? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onRemoveBook(book.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Remove Book
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BookTable;
