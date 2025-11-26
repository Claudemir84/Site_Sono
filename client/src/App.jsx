import { useState, useEffect, useCallback } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [registros, setRegistros] = useState([]);
  const [form, setForm] = useState({ tipo: 'sono', descricao: '', valor: '' });
  const [editandoId, setEditandoId] = useState(null);


  const [filtroInicio, setFiltroInicio] = useState('');
  const [filtroFim, setFiltroFim] = useState('');

  const carregarRegistros = useCallback(async () => {
    try {
      const response = await api.get('/registros');
      setRegistros(response.data);
    } catch (error) {
      console.error("Erro", error);
    }
  }, []);

  useEffect(() => {
    carregarRegistros();
  }, [carregarRegistros]);

  async function handleSubmit(e) {
    e.preventDefault();

    const dadosParaEnviar = { ...form };

    if (editandoId) {
      await api.put(`/registros/${editandoId}`, dadosParaEnviar);
      setEditandoId(null);
    } else {
      await api.post('/registros', dadosParaEnviar);
    }
    setForm({ tipo: 'sono', descricao: '', valor: '' });
    carregarRegistros();
  }

  function handleEdit(registro) {
    setForm({
      tipo: registro.tipo,
      descricao: registro.descricao,
      valor: registro.valor
    });
    setEditandoId(registro.id);
  }

  async function handleDelete(id) {
    if (confirm('Excluir registro?')) {
      await api.delete(`/registros/${id}`);
      carregarRegistros();
    }
  }


  const registrosFiltrados = registros.filter(reg => {
    if (!reg.data) return true;

    const dataRegistro = reg.data;

    if (filtroInicio && dataRegistro < filtroInicio) return false;


    if (filtroFim && dataRegistro > filtroFim) return false;

    return true;
  });

  const listaParaCalculo = registrosFiltrados;
  const totalSono = listaParaCalculo.filter(r => r.tipo === 'sono').reduce((acc, curr) => acc + curr.valor, 0);
  const totalCalorias = listaParaCalculo.filter(r => r.tipo === 'alimentacao').reduce((acc, curr) => acc + curr.valor, 0);
  const totalExercicio = listaParaCalculo.filter(r => r.tipo === 'exercicio').reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <div className="app-container">
      <main className="main-content">

        <header>
          <h1>Dashboard de Saúde</h1>
          <p>Visão geral das suas atividades</p>
        </header>

        <div className="cards-grid">
          <div className="stat-card bg-blue">
            <div className="stat-title">SONO</div>
            <div className="stat-value">{totalSono}h</div>
          </div>
          <div className="stat-card bg-green">
            <div className="stat-title">CALORIAS</div>
            <div className="stat-value">{totalCalorias}</div>
          </div>
          <div className="stat-card bg-orange">
            <div className="stat-title">EXERCÍCIOS</div>
            <div className="stat-value">{totalExercicio}m</div>
          </div>
        </div>


        <div className="bottom-section">

          <div className="white-box">
            <div className="white-box-header">
              <h3>{editandoId ? 'Editar' : 'Novo Registro'}</h3>
            </div>
            <form onSubmit={handleSubmit} className="form-group">



              <div>
                <label>Categoria</label>
                <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                  <option value="sono">Sono (Horas)</option>
                  <option value="alimentacao">Alimentação (Kcal)</option>
                  <option value="exercicio">Exercício (Min)</option>
                </select>
              </div>

              <div>
                <label>Descrição</label>
                <input
                  placeholder="Ex: Almoço..."
                  value={form.descricao}
                  onChange={e => setForm({ ...form, descricao: e.target.value })}
                  required
                />
              </div>

              <div>
                <label>Valor</label>
                <input type="number" placeholder="0" value={form.valor} onChange={e => setForm({ ...form, valor: parseFloat(e.target.value) })} required />
              </div>

              <button type="submit" className="btn-add">
                {editandoId ? 'Salvar' : 'Adicionar'}
              </button>

              {editandoId && (
                <button type="button" onClick={() => { setEditandoId(null); setForm({ tipo: 'sono', descricao: '', valor: '' }) }} style={{ marginTop: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: '#A3AED0' }}>Cancelar</button>
              )}
            </form>
          </div>


          <div className="white-box">


            <div className="white-box-header" style={{ flexWrap: 'wrap', gap: '10px' }}>
              <h3>Histórico</h3>
              <div className="filter-container">
                <div className="date-input-group">
                  <span>De:</span>
                  <input
                    type="date"
                    value={filtroInicio}
                    onChange={e => setFiltroInicio(e.target.value)}
                  />
                </div>
                <div className="date-input-group">
                  <span>Até:</span>
                  <input
                    type="date"
                    value={filtroFim}
                    onChange={e => setFiltroFim(e.target.value)}
                  />
                </div>
                {(filtroInicio || filtroFim) && (
                  <button onClick={() => { setFiltroInicio(''); setFiltroFim('') }} style={{ border: 'none', background: 'transparent', color: '#E53E3E', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Limpar</button>
                )}
              </div>
            </div>


            <div className="history-scroll-area">
              {registrosFiltrados.length === 0 ? (
                <p style={{ color: '#A3AED0', fontStyle: 'italic', textAlign: 'center', marginTop: '20px' }}>
                  Nenhum registro neste período.
                </p>
              ) : (
                <div className="history-list">
                  {registrosFiltrados.map(reg => (
                    <div key={reg.id} className="history-card-item">
                      <div className="card-icon-box" style={{
                        background: reg.tipo === 'sono' ? '#E9E3FF' : reg.tipo === 'alimentacao' ? '#E6FFFA' : '#FFF7E6',
                        color: reg.tipo === 'sono' ? '#4318FF' : reg.tipo === 'alimentacao' ? '#05CD99' : '#FFB547'
                      }}>
                        {reg.tipo === 'sono' ? '💤' : reg.tipo === 'alimentacao' ? '🍎' : '🏃‍♂️'}
                      </div>

                      <div className="card-info">
                        <h4>{reg.descricao}</h4>
                        <p>{reg.data ? reg.data.split('-').reverse().join('/') : 'Hoje'}</p>
                      </div>

                      <div className="card-value">
                        {reg.valor}
                        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#A3AED0', marginLeft: 2 }}>
                          {reg.tipo === 'sono' ? 'h' : reg.tipo === 'alimentacao' ? 'kcal' : 'min'}
                        </span>
                      </div>

                      <div className="card-actions">
                        <button className="btn-mini" onClick={() => handleEdit(reg)} title="Editar">✏️</button>
                        <button className="btn-mini" onClick={() => handleDelete(reg.id)} title="Excluir" style={{ color: '#E53E3E' }}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;