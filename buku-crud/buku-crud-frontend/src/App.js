import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Navbar, Nav, Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import router

// Komponen Halaman
const Home = () => <div>Home Page</div>;
const Kategori = () => {
  const [kategori, setKategori] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", kategori: "",});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/kategori")
      .then(response => setKategori(response.data))
      .catch(error => console.error("There was an error fetching the data!", error));
  }, []);

  const handleAddEdit = () => {
    if (isEdit) {
      axios.put(`http://localhost:5000/api/kategori/${formData.id}`, formData)
        .then(() => {
          setShowModal(false);
          setFormData({ id: "", kategori: "",});
          setIsEdit(false);
          loadData();
        })
        .catch(error => console.error("There was an error updating the data!", error));
    } else {
      axios.post("http://localhost:5000/api/kategori", formData)
        .then(() => {
          setShowModal(false);
          setFormData({ kategori: ""});
          loadData();
        })
        .catch(error => console.error("There was an error creating the data!", error));
    }
  };

  const handleEdit = (kategori) => {
    setFormData(kategori);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/kategori/${id}`)
      .then(() => loadData())
      .catch(error => console.error("There was an error deleting the data!", error));
  };


  const loadData = () => {
    axios.get("http://localhost:5000/api/kategori")
      .then(response => setKategori(response.data))
      .catch(error => console.error("There was an error fetching the data!", error));
  };

  const columns = [
    {
      name: "Kategori",
      selector: row => row.kategori,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <Button className="btn btn-warning" style={{ marginRight: "10px" }} onClick={() => handleEdit(row)}><i className="fas fa-edit"></i> </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}><i className="fas fa-trash"></i> </Button>
        </>
      ),
    },
  ];


  return (
    <div className="container mt-4">
      <h2>Kategori</h2>
      <Button className="mb-3 mt-2" onClick={() => setShowModal(true)}><i className="fas fa-plus"></i> Tambah Kategori</Button>

      <DataTable
        title="Kategori"
        columns={columns}
        data={kategori}
        pagination
        className="table-striped table-bordered"
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Kategori" : "Tambah Kategori"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                type="text"
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEdit}>
            {isEdit ? "Update Kategori" : "Add Kategori"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const Buku = () => {
  const [buku, setBuku] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: "", judul: "", penulis: "", tahun: "" });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/buku")
      .then(response => setBuku(response.data))
      .catch(error => console.error("There was an error fetching the data!", error));


      axios.get("http://localhost:5000/api/kategori")
      .then(response => setKategori(response.data))
      .catch(error => console.error("Error fetching kategori data", error));
      
  }, []);

  const handleAddEdit = () => {
    if (isEdit) {
      axios.put(`http://localhost:5000/api/buku/${formData.id}`, formData)
        .then(() => {
          setShowModal(false);
          setFormData({ id: "", judul: "", penulis: "", tahun: "" , kategori_id: "" });
          setIsEdit(false);
          loadData();
        })
        .catch(error => console.error("There was an error updating the data!", error));
    } else {
      axios.post("http://localhost:5000/api/buku", formData)
        .then(() => {
          setShowModal(false);
          setFormData({ judul: "", penulis: "", tahun: "", kategori_id: ""  });
          loadData();
        })
        .catch(error => console.error("There was an error creating the data!", error));
    }
  };

  const handleEdit = (buku) => {
    setFormData(buku);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/buku/${id}`)
      .then(() => loadData())
      .catch(error => console.error("There was an error deleting the data!", error));
  };

  const loadData = () => {
    axios.get("http://localhost:5000/api/buku")
      .then(response => setBuku(response.data))
      .catch(error => console.error("There was an error fetching the data!", error));
  };

  const columns = [
    {
      name: "Judul",
      selector: row => row.judul,
    },
    {
      name: "Penulis",
      selector: row => row.penulis,
    },
    {
      name: "Tahun",
      selector: row => row.tahun,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <>
          <Button className="btn btn-warning" style={{ marginRight: "10px" }} onClick={() => handleEdit(row)}><i className="fas fa-edit"></i> </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}><i className="fas fa-trash"></i> </Button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Data Buku</h2>
      <Button className="mb-3" onClick={() => setShowModal(true)}><i className="fas fa-plus"></i> Tambah Buku</Button>
      <DataTable
        title="Buku"
        columns={columns}
        data={buku}
        pagination
        className="table-striped table-bordered"
      />

      {/* Modal untuk menambah dan mengedit data */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Edit Buku" : "Tambah Buku"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Penulis</Form.Label>
              <Form.Control
                type="text"
                value={formData.penulis}
                onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tahun</Form.Label>
              <Form.Control
                type="number"
                value={formData.tahun}
                onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
              />
            </Form.Group>
             <Form.Group>
              <Form.Label>Kategori</Form.Label>
                <Form.Control
                  as="select"
                  value={formData.kategori_id}
                  onChange={(e) => setFormData({ ...formData, kategori_id: e.target.value })}
                >
                  <option value="">Pilih Kategori</option>
                  {kategori.map(kat => (
                    <option key={kat.id} value={kat.id}>
                      {kat.kategori}
                    </option>
                  ))}
                </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEdit}>
            {isEdit ? "Update Buku" : "Add Buku"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Buku App</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/buku">Buku</Nav.Link>
              <Nav.Link href="/kategori">Kategori</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kategori" element={<Kategori />} />
          <Route path="/buku" element={<Buku />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
