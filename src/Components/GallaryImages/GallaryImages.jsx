import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { api, API_URL } from "../../Apiservice/Apiservice";
import { toast } from "react-toastify";


export function DefaultGallery() {
  const [galleryData, setGalleryData] = useState([]); 
  const [selectedImages, setSelectedImages] = useState([]);
  const [editImage, setEditImage] = useState(null);
  const [titles, setTitles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  console.log(galleryData,"haii");
  

 
  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await api.get("/imageview/"); 
      setGalleryData(response.data);
    } catch (error) {
      console.error("Failed to fetch gallery:", error);
    }
  };

  const handleImageSelection = (event) => {
    const files = event.target.files;
    setSelectedImages(Array.from(files));
  };

  const handleTitleChange = (index, event) => {
    const newTitles = [...titles];
    newTitles[index] = event.target.value;
    setTitles(newTitles);
  };
  const handleUpload = async () => {
    if (selectedImages.length === 0 || titles.length === 0) {
      toast.error("No images or titles to upload");
      return;
    }
  
    
    const validFormats = ["image/jpeg", "image/png"];
    for (let image of selectedImages) {
      if (!validFormats.includes(image.type)) {
        toast.error("Only JPG and PNG formats are allowed");
        return;
      }
    }
  
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append("image", image);
      formData.append("title", titles[index] || "");
    });
  
    try {
      toast.loading("Uploading images...");
      const response = await api.post(`/imageupload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
  
      toast.dismiss(); 
      toast.success("Images uploaded successfully!");
      setIsModalOpen(false);
      fetchGallery();
    } catch (error) {
      toast.dismiss(); 
      console.error("Failed to upload images:", error);
      toast.error("Failed to upload images");
    }
  };

  const handleEditImage = (index) => {
    console.log("Edit button clicked for index:", index);
    setEditIndex(index);
    setEditTitle(galleryData[index]?.title || ""); 
    setIsEditModalOpen(true);
  };
  
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reorderedData = Array.from(galleryData);
    const [removed] = reorderedData.splice(result.source.index, 1);
    reorderedData.splice(result.destination.index, 0, removed);

    setGalleryData(reorderedData);

  
    try {
      await api.post("/updateorder/", {
        order: reorderedData.map((item) => item.id),
      });
      console.log("Order updated successfully");
    } catch (error) {
      console.error("Failed to save new order:", error);
    }
  };



  const handleDeleteImage = async () => {
    try {
      await api.delete(`/deleteimg/${galleryData[deleteIndex].id}/`); 
      setIsDeleteModalOpen(false);
      fetchGallery(); 
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  

  const handleSaveEdit = async () => {
    if (editTitle.trim() === "") {
      toast.error("Title cannot be empty");
      return;
    }
  
    if (editImage) {
      const validFormats = ["image/jpeg", "image/png"];
      if (!validFormats.includes(editImage.type)) {
        toast.error("Only JPG and PNG formats are allowed");
        return;
      }
    }
  
    const formData = new FormData();
    formData.append("title", editTitle);
  
    if (editImage) {
      formData.append("image", editImage);
    }
  
    try {
      toast.loading("Saving changes...");
      const response = await api.put(`/imagedit/${galleryData[editIndex].id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log(response);
  
      const updatedImage = { ...galleryData[editIndex], title: editTitle };
      if (editImage) {
        updatedImage.image = URL.createObjectURL(editImage); 
      }
  
      setGalleryData((prevData) => {
        const newData = [...prevData];
        newData[editIndex] = updatedImage;
        return newData;
      });
  
      fetchGallery();
      setIsEditModalOpen(false);
      toast.dismiss(); 
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.dismiss(); 
      console.error("Failed to edit image title or upload image:", error);
      toast.error("Failed to save changes");
    }
  };

  return (
    <div className="p-4">
  
      <DragDropContext onDragEnd={handleDragEnd}>
  {galleryData.length > 0 ? (
    <Droppable droppableId="gallery">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 droppable-area"
        >
          {galleryData.map(({ id, image, title }, index) => (
            <Draggable key={id} draggableId={String(id)} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="group relative"
                >
                  <img
                    className="h-40 w-full max-w-full rounded-lg object-cover object-center transition-transform duration-300 transform group-hover:scale-105"
                    src={`${API_URL}${image}`}
                    alt="gallery-photo"
                  />
                 
                  <div className="absolute inset-0 bg-black h-40 w-full max-w-full opacity-75 rounded-lg hidden group-hover:block ">
                  <div className="absolute bottom-2 left-4 text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out transform group-hover:scale-110">
                  {title}
                 </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {handleEditImage(index)
                          
                          
                        }
    
    }
                        className="bg-white text-black p-1 rounded-full"
                      >
                        <PencilIcon className="h-6 w-6 text-gray-800" />
                      </button>
                      <button
                        onClick={() =>{setDeleteIndex(index) ,  setIsDeleteModalOpen(true);}}
                        className="bg-white text-black p-1 rounded-full"
                      >
                        <TrashIcon className="h-6 w-6 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  ) : (
    <p>Loading...</p>
  )}
</DragDropContext>
    
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Add More Images
      </button>

      {/* Add Images Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Select Images and Add Titles</h2>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageSelection}
              className="mb-4 block w-full text-gray-700 border border-gray-300 rounded-lg p-3"
            />
            {selectedImages.length > 0 && (
              <div className="space-y-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="selected"
                      className="h-20 w-20 object-cover rounded"
                    />
                    <input
                      type="text"
                      placeholder={`Title for image ${index + 1}`}
                      value={titles[index] || ""}
                      onChange={(e) => handleTitleChange(index, e)}
                      className="border rounded p-2 flex-1"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

{isEditModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Edit Image and Title</h2>
      
      {/* Title Input */}
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full border rounded p-2 mb-4"
        placeholder="Enter new title"
      />
      
      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setEditImage(e.target.files[0])}
        className="w-full border rounded p-2 mb-4"
      />
      
      
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setIsEditModalOpen(false)}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveEdit}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

      {/* Delete Confirmation Modal */}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this image?
            </h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteImage}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default DefaultGallery;
