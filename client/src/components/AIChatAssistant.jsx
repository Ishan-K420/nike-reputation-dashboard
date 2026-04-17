import { useState, useRef, useEffect } from 'react';

export default function AIChatAssistant({ products, isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I can help you analyze Nike products. Try asking: "Which products have the highest scores?" or "Show me basketball shoes under $150"' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('highest score') || q.includes('best')) {
      const top = [...products].sort((a, b) => b.Score - a.Score).slice(0, 3);
      return `Top 3 products by score:\n${top.map(p => `• ${p.Name}: ${p.Score} (${p.Category})`).join('\n')}`;
    }
    
    if (q.includes('lowest score') || q.includes('worst')) {
      const bottom = [...products].sort((a, b) => a.Score - b.Score).slice(0, 3);
      return `Products needing attention:\n${bottom.map(p => `• ${p.Name}: ${p.Score} (${p.Category})`).join('\n')}`;
    }
    
    if (q.includes('basketball')) {
      const basketball = products.filter(p => p.Category.toLowerCase() === 'basketball');
      return `Found ${basketball.length} basketball products:\n${basketball.slice(0, 5).map(p => `• ${p.Name}: $${p.Price} (Score: ${p.Score})`).join('\n')}`;
    }
    
    if (q.includes('running')) {
      const running = products.filter(p => p.Category.toLowerCase() === 'running');
      return `Found ${running.length} running products:\n${running.slice(0, 5).map(p => `• ${p.Name}: $${p.Price} (Score: ${p.Score})`).join('\n')}`;
    }
    
    if (q.includes('under') || q.includes('less than')) {
      const price = parseInt(q.match(/\d+/)?.[0] || '150');
      const affordable = products.filter(p => p.Price < price);
      return `Found ${affordable.length} products under $${price}:\n${affordable.slice(0, 5).map(p => `• ${p.Name}: $${p.Price} (Score: ${p.Score})`).join('\n')}`;
    }
    
    if (q.includes('average') || q.includes('mean')) {
      const avg = (products.reduce((s, p) => s + p.Score, 0) / products.length).toFixed(1);
      return `Average brand score: ${avg}\nTotal products: ${products.length}\nProducts at risk (<80): ${products.filter(p => p.Score < 80).length}`;
    }
    
    if (q.includes('category') || q.includes('categories')) {
      const cats = {};
      products.forEach(p => {
        if (!cats[p.Category]) cats[p.Category] = { count: 0, avgScore: 0 };
        cats[p.Category].count++;
        cats[p.Category].avgScore += p.Score;
      });
      return `Category breakdown:\n${Object.entries(cats).map(([cat, data]) => 
        `• ${cat}: ${data.count} products, avg score ${(data.avgScore / data.count).toFixed(1)}`
      ).join('\n')}`;
    }
    
    return `I can help you with:\n• "Show me the best products"\n• "Which basketball shoes are available?"\n• "Products under $150"\n• "What's the average score?"\n• "Show me categories"`;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    
    setTimeout(() => {
      const response = generateResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 500);
    
    setInput('');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          color: 'white',
          fontSize: '1.5rem',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          zIndex: 1000,
          transition: 'transform 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '6rem',
          right: '2rem',
          width: '380px',
          height: '500px',
          background: isDark ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '1rem',
            borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>🤖 Nike AI Assistant</h3>
            <p style={{ fontSize: '0.75rem', margin: '0.25rem 0 0', opacity: 0.9 }}>Ask me anything about the products</p>
          </div>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%'
              }}>
                <div style={{
                  padding: '0.75rem',
                  borderRadius: '12px',
                  background: msg.role === 'user' 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  color: msg.role === 'user' ? 'white' : isDark ? '#fff' : '#0a0a0a',
                  fontSize: '0.875rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{
            padding: '1rem',
            borderTop: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about products..."
              style={{
                flex: 1,
                padding: '0.75rem',
                borderRadius: '8px',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                color: isDark ? '#fff' : '#0a0a0a',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              style={{
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
