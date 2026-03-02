import React, { useEffect, useState } from "react"
import axios from "axios"

export default function HomeUser() {
    const [user, setUser] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")

    const token = localStorage.getItem('token')

    const listar = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/usuarios', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setUser(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { listar() }, [])

    const handleSearch = () => {
        setSearch(searchInput)
    }

    const usuariosFiltrados = user.filter((u) =>
        u.nome.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <h2>Lista de Usuários</h2>

            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="Digite o nome..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ padding: "8px", width: "250px", marginRight: "10px" }}
                />

                <button onClick={handleSearch} style={{ padding: "8px 15px" }}>
                    Pesquisar
                </button>
            </div>

            <table border="1" cellPadding="6" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosFiltrados.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nome}</td>
                            <td>{u.email}</td>
                            <td>{u.telefone}</td>
                            <td>{u.tipo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <hr style={{ margin: "20px 0" }} />
        </div>
    )
}