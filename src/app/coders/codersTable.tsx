"use client";

import { ICoder } from "@/models/coders/coder.model";
import { CoderService } from "@/services/coders.services";
import { useRouter } from "next/navigation";
import { FaUserMinus } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import React, { useState } from 'react';
import Modal from "@/components/modal";

interface IProps {
  data: ICoder[];
}

function CodersTable({ data }: IProps) {
  const useCoderService = new CoderService();
  const router = useRouter();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentCoder, setCurrentCoder] = useState<{ id: string; name: string; avatar: string } | null>(null);

  const handleDelete = async (id: string) => {
    await useCoderService.destroy(id);
    router.refresh();
  };

  const handleEdit = async (id: string, name: string, avatar: string) => {
    try {
      await useCoderService.edit(id, { name, avatar });
      router.refresh();
    } catch (error) {
      console.error('Error editing coder:', error);
    }
  };

  const openModal = (coder: ICoder) => {
    setCurrentCoder(coder);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentCoder(null);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Avatar</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coder) => (
            <tr key={coder.id}>
              <td>{coder.id}</td>
              <td>{coder.name}</td>
              <td>{coder.avatar}</td>
              <td>
                <button onClick={() => openModal(coder)}><FaUserEdit /></button>
                <button onClick={() => handleDelete(coder.id)}><FaUserMinus /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentCoder && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onEdit={(name, avatar) => handleEdit(currentCoder.id, name, avatar)}
          coder={currentCoder}
        />
      )}
    </>
  );
}

export default CodersTable;
