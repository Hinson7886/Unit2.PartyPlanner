const COHORT = "2309-FTB-ET-WEB-FT";
// 1. TODO - changed URL from starter
const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/" + COHORT;

const state = {
  events: [],
  event: null,
  guests: [],
  rsvps: [],
};

// The $ prefix is used here to denote variables that reference DOM elements
const $eventList = document.querySelector("#eventList");
const $eventDetails = document.querySelector("#eventDetails");
const $guests = document.querySelector("#guests");
const $guestList = document.querySelector("#guestList");

async function render() {
    await getEvents();
    await getGuests();
    await getRsvps();
  
    renderEvents();
    selectEvent();
  }
  
  render();

// Log initial state
console.log('Initial State:', state);

async function getGuests() {
    try {
      const response = await fetch(API + "/guests");
      const json = await response.json();
      state.guests = json.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getEvents() {
    try {
      const response = await fetch(API + "/events");
      const json = await response.json();
      state.events = json.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function getRsvps() {
    try {
      const response = await fetch(API + "/rsvps");
      const json = await response.json();
      state.rsvps = json.data;
    } catch (error) {
      console.error(error);
    }
  }

  // Function to add a new party
async function addNewParty(newPartyData) {
    try {
      const response = await fetch(API + "/events", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPartyData),
      });
  
      if (!response.ok) {
        // If the response status is not okay, handle the error
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.error.message}`);
      }
  
      const createdParty = await response.json();
      console.log('New Party Created:', createdParty.data);
      return createdParty.data;
    } catch (error) {
      console.error('Error adding new party:', error.message);
    }
  }
  
  // Example data for the new party
  const newPartyData = {
    name: "New Year's Eve Party",
    description: "A fantastic celebration to ring in the new year!",
    date: "2023-12-31T23:59:59.999Z",
    location: "Party Venue"
  };
  
  // Call the function to add a new party
  addNewParty(newPartyData);

  // Function to delete a party
async function deleteParty(partyId) {
    try {
      const response = await fetch(`${API}/events/${partyId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        // If the response status is not okay, handle the error
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.error.message}`);
      }
  
      console.log('Party Deleted Successfully');
  
      // Optionally, update the state or perform any other necessary actions after deletion
  
    } catch (error) {
      console.error('Error deleting party:', error.message);
    }
  }

  async function fetchAndDisplayParties() {
    try {
      // Fetch events (parties) from the API
      const response = await fetch(`${API}/events`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error fetching parties: ${errorData.error.message}`);
      }
  
      const partyData = await response.json();
  
      // Display the list of parties
      const partyListContainer = document.getElementById('eventList');
      partyListContainer.innerHTML = ''; // Clear existing content
  
      partyData.data.forEach(party => {
        const partyElement = document.createElement('div');
        partyElement.innerHTML = `
          <h3>${party.name}</h3>
          <p>Date: ${new Date(party.date).toLocaleDateString()}</p>
          <p>Time: ${new Date(party.date).toLocaleTimeString()}</p>
          <p>Location: ${party.location}</p>
          <p>Description: ${party.description}</p>
          <hr>
        `;
        partyListContainer.appendChild(partyElement);
      });
  
    } catch (error) {
      console.error('Error fetching and displaying parties:', error.message);
    }
  }

  async function addNewParty(newPartyData) {
    try {
      const response = await fetch(`${API}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPartyData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error adding new party: ${errorData.error.message}`);
      }
  
      const createdParty = await response.json();
      console.log('New Party Created:', createdParty.data);
  
      // Refresh the displayed list after adding the new party
      fetchAndDisplayPartiesWithDeleteButtons();
  
    } catch (error) {
      console.error('Error adding new party:', error.message);
    }
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
  
    // Get form input values
    const partyName = document.getElementById('partyName').value;
    const partyDate = document.getElementById('partyDate').value;
    const partyTime = document.getElementById('partyTime').value;
    const partyLocation = document.getElementById('partyLocation').value;
    const partyDescription = document.getElementById('partyDescription').value;
  
    // Validate form input (add your validation logic here)
  
    // Create an object with the new party data
    const newPartyData = {
      name: partyName,
      date: partyDate + 'T' + partyTime,
      location: partyLocation,
      description: partyDescription,
    };
  
    // Add the new party
    addNewParty(newPartyData);
  }
  
  // Attach the form submission event listener
  const partyForm = document.getElementById('partyForm');
  partyForm.addEventListener('submit', handleFormSubmit);
  
  // Call the function to fetch and display parties with delete buttons
  fetchAndDisplayPartiesWithDeleteButtons();

  
  
  // Call the function to fetch and display parties
  fetchAndDisplayParties();
  
  // Example: Replace '1' with the actual ID of the party/event you want to delete
//   const partyIdToDelete = 1;





  // Call the functions
getGuests();
// Call the function to delete a party
deleteParty();
renderGuests();