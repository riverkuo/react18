import React, { useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  images: string[];
  type: string;
  price: number;
  isNotified: boolean;
  inCart: boolean;
}

const BOOK_TYPES = ['小說', '技術', '漫畫', '其他'];

const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: '三體',
    author: '劉慈欣',
    images: ['https://picsum.photos/200/300'],
    type: '小說',
    price: 350,
    isNotified: false,
    inCart: false
  },
  {
    id: '2',
    title: 'React 實戰',
    author: 'John Doe',
    images: ['https://picsum.photos/200/300'],
    type: '技術',
    price: 450,
    isNotified: true,
    inCart: false
  },
  {
    id: '3',
    title: '進擊的巨人',
    author: '諫山創',
    images: ['https://picsum.photos/200/300'],
    type: '漫畫',
    price: 280,
    isNotified: false,
    inCart: false
  }
];

type ViewMode = 'grid' | 'list';

export function Home() {
  const [books, setBooks] = useState<Book[]>(MOCK_BOOKS);
  const [filterType, setFilterType] = useState<string>('');
  const [showCart, setShowCart] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleNotify = (id: string) => {
    setBooks(bs => bs.map(b => b.id === id ? { ...b, isNotified: true } : b));
  };

  const handleAddToCart = (id: string) => {
    setBooks(bs => bs.map(b => b.id === id ? { ...b, inCart: true } : b));
  };

  const handleRemoveFromCart = (id: string) => {
    setBooks(bs => bs.map(b => b.id === id ? { ...b, inCart: false } : b));
  };

  const filteredBooks = filterType
    ? books.filter(b => b.type === filterType)
    : books;

  const cartItems = books.filter(b => b.inCart);
  const totalPrice = cartItems.reduce((sum, book) => sum + book.price, 0);

  const renderBookList = () => {
    if (viewMode === 'grid') {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {filteredBooks.map(book => (
            <div key={book.id} style={{ border: '1px solid #eee', padding: 16, borderRadius: 8 }}>
              <img src={book.images[0]} alt={book.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>NT$ {book.price}</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button 
                  onClick={() => handleAddToCart(book.id)}
                  disabled={book.inCart}
                >
                  {book.inCart ? '已在購物車' : '加入購物車'}
                </button>
                <button 
                  onClick={() => handleNotify(book.id)}
                  disabled={book.isNotified}
                >
                  {book.isNotified ? '已通知' : '到貨通知'}
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div>
        {filteredBooks.map(book => (
          <div key={book.id} style={{ 
            display: 'flex', 
            gap: 16, 
            padding: 16, 
            border: '1px solid #eee', 
            marginBottom: 16,
            borderRadius: 8,
            alignItems: 'center'
          }}>
            <img 
              src={book.images[0]} 
              alt={book.title} 
              style={{ width: 100, height: 100, objectFit: 'cover' }} 
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{book.title}</h3>
              <p style={{ margin: '4px 0' }}>{book.author}</p>
              <p style={{ margin: '4px 0' }}>類型: {book.type}</p>
              <p style={{ margin: '4px 0' }}>NT$ {book.price}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button 
                onClick={() => handleAddToCart(book.id)}
                disabled={book.inCart}
              >
                {book.inCart ? '已在購物車' : '加入購物車'}
              </button>
              <button 
                onClick={() => handleNotify(book.id)}
                disabled={book.isNotified}
              >
                {book.isNotified ? '已通知' : '到貨通知'}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1>書店</h1>
        <button onClick={() => setShowCart(!showCart)}>
          購物車 ({cartItems.length})
        </button>
      </div>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">全部類型</option>
          {BOOK_TYPES.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div style={{ display: 'flex', gap: 8 }}>
          <button 
            onClick={() => setViewMode('grid')}
            style={{ 
              background: viewMode === 'grid' ? '#e0e0e0' : 'transparent',
              border: '1px solid #ccc',
              padding: '4px 8px'
            }}
          >
            網格
          </button>
          <button 
            onClick={() => setViewMode('list')}
            style={{ 
              background: viewMode === 'list' ? '#e0e0e0' : 'transparent',
              border: '1px solid #ccc',
              padding: '4px 8px'
            }}
          >
            列表
          </button>
        </div>
      </div>

      {showCart ? (
        <div>
          <h2>購物車</h2>
          {cartItems.length === 0 ? (
            <div>購物車是空的</div>
          ) : (
            <>
              <ul>
                {cartItems.map(book => (
                  <li key={book.id} style={{ border: '1px solid #eee', margin: 8, padding: 8 }}>
                    <div>
                      <b>{book.title}</b> / {book.author}
                    </div>
                    <div>NT$ {book.price}</div>
                    <button onClick={() => handleRemoveFromCart(book.id)}>移除</button>
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                總計: NT$ {totalPrice}
              </div>
              <button style={{ marginTop: 16 }}>結帳</button>
            </>
          )}
        </div>
      ) : (
        renderBookList()
      )}
    </div>
  );
}