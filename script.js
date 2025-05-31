import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsX5fXWltUYvrmlQpK-0I_tH4EeSgvs6w",
  authDomain: "grocerylistapp-67353.firebaseapp.com",
  projectId: "grocerylistapp-67353",
  storageBucket: "grocerylistapp-67353.firebasestorage.app",
  messagingSenderId: "735600024809",
  appId: "1:735600024809:web:87c9ab801b8456868ae478"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const groceryCol = collection(db, "groceries");

const input = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("grocery-list");

addBtn.onclick = async () => {
  const item = input.value.trim();
  if (item) {
    console.log("Adding item:", item);
    try {
      await addDoc(groceryCol, { name: item });
      console.log("Item added to Firestore!");
      input.value = "";
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Failed to add item: " + error.message);
    }
  } else {
    console.log("No item entered.");
  }
};

onSnapshot(groceryCol, (snapshot) => {
  list.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const li = document.createElement("li");
    li.textContent = docSnap.data().name;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove";
    removeBtn.onclick = async () => {
      try {
        await deleteDoc(doc(groceryCol, docSnap.id));
        console.log("Item removed:", docSnap.id);
      } catch (error) {
        console.error("Error removing document:", error);
        alert("Failed to remove item: " + error.message);
      }
    };

    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}, error => {
  console.error("Snapshot listener error:", error);
});