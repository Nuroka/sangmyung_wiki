import { useState, useEffect } from "react";

import DeleteConfirmation from "../../component/docs/DeleteConfirmation";
import DeletedConfirmation from "../../component/docs/DeletedConfirmation";
import MyDocsList from "../../component/docs/MyDocsList";
import { authInstance } from "../../util/api";
import outlet from "../../layout/OutletLayout.module.css";
import Modal from "../../component/Modal";

export default function MyDocs() {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deletedDoc, setDeletedDoc] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setError();
      const url = "/my-docs";
      authInstance
        .get(url)
        .then(function (res) {
          if (res.status === 200) {
            setData(res.data);
          } else {
            throw new Error();
          }
        })
        .catch(function (e) {
          setError({ message: "정보 가져오기 실패! 다시 시도해주세요." });
        });
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    setDocToDelete(id);
    setModalIsOpen(true);
  };

  const confirmDelete = async () => {
    const url = "/docs?id=" + docToDelete;

    setModalIsOpen(false);

    try {
      authInstance.post(url).then(function (res) {
        if (res.status === 200) {
          const newData = data.filter(
            (data) => data.documents.id !== docToDelete
          );
          setData(newData);
          setDeletedDoc(true);
        } else {
          throw new Error();
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <DeleteConfirmation onConfirm={confirmDelete} />
      </Modal>
      <Modal open={deletedDoc} onClose={() => setDeletedDoc(false)}>
        <DeletedConfirmation onConfirm={() => setDeletedDoc(false)} />
      </Modal>
      <h2 className={outlet.title}>내 문서</h2>
      <br />
      <MyDocsList docs={data} handleDelete={handleDelete} />
      {!data && <p>로딩 중....</p>}
      {error && <p>{error.message}</p>}
    </>
  );
}
