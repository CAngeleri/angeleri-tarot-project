console.log("Who said you could look over here?");

// Function to load the JSON file
async function loadJSON() {
  try {
    const response = await fetch("tarot-images.json");
    if (!response.ok) {
      throw new Error("Failed to load JSON file");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading JSON:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

// Card image variables
const past_img = document.getElementById("past_img");
const present_img = document.getElementById("present_img");
const future_img = document.getElementById("future_img");

// reading section

// Heart - Function to generate a random card ID
function getCard() {
  const cardTypes = ["w", "s", "m", "p", "c"];
  const minCeiled = Math.ceil(1);
  let cardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];

  let maxFloored;
  if (cardType === "m") {
    maxFloored = Math.floor(21);
  } else {
    maxFloored = Math.floor(14);
  }

  let randomNum =
    Math.floor(Math.random() * (maxFloored - minCeiled + 1)) + minCeiled;

  if (randomNum < 10) {
    randomNum = "0" + randomNum;
  }

  return cardType + randomNum;
}

// Function to get the card object based on image filename - converts random numVar to Card with usable data
function getCardObject(card_img_id, jsonData) {
  for (const card of jsonData.cards) {
    if (card.img === card_img_id) {
      return card;
    }
  }
  return null;
}

// header links functions - can be used independently without input
async function getSingleCard() {
  try {
    const jsonData = await loadJSON();
    // remove form also early out for if reading already loaded
    var form_container = document.querySelector(".form-container");
    form_container.parentNode.removeChild(form_container);
    // remove L & R cards
    var past_container = document.querySelector(".past-card-container");
    var future_container = document.querySelector(".future-card-container");
    if (past_container) 
      past_container.parentNode.removeChild(past_container);
    if (future_container)
      future_container.parentNode.removeChild(future_container);

    // Present card
    let present_var = getCard();
    let present_card = getCardObject(`${present_var}.jpg`, jsonData);
    present_img.src = `./cards/${present_var}.jpg`;
    document.getElementById("present_card_name").innerText = present_card.name;
    document.getElementById("present_card_description").innerText =
      "Currently you may be experiencing the push of " +
      present_card.meanings.light.join(", ") +
      "\n\n";
    document.getElementById("present_card_description_shadow").innerText =
      "With push there is also pull, this card cast the shadow of " +
      present_card.meanings.shadow.join(", ") +
      "\n\n";
    document.getElementById("present_card_questions").innerText =
      "Today you should examine " +
      present_card.fortune_telling.join(", ") +
      "\n\n";

    alert("Simple questions often find simple answers");
  } catch (error) {
    console.error("Error in getSingleCard:", error);
    // Handle the error or notify the user appropriately
  }
}

async function getPastPresentFuture() {
  try {
    const jsonData = await loadJSON();
    var form_container = document.querySelector(".form-container");
    form_container.parentNode.removeChild(form_container);

    // Past card
    let past_var = getCard();
    let past_card = getCardObject(`${past_var}.jpg`, jsonData);
    past_img.src = `./cards/${past_var}.jpg`;
    document.getElementById("past_header").innerText = "The Past ...";
    document.getElementById("past_card_name").innerText = past_card.name;
    document.getElementById("past_card_description").innerText =
      "In the past this card could mean " +
      past_card.meanings.light.join(", ") +
      "\n\n";
    document.getElementById("past_card_description_shadow").innerText =
      "You need to know that this could also mean " +
      past_card.meanings.shadow.join(", ") +
      "\n\n";
    document.getElementById("past_card_question").innerText =
      "As you move forward you should ask " +
      past_card.Questions_to_Ask.join(" ") +
      "\n\n";

    // Present card
    let present_var = getCard();
    let present_card = getCardObject(`${present_var}.jpg`, jsonData);
    present_img.src = `./cards/${present_var}.jpg`;
    document.getElementById("present_header").innerText = "The Present ...";
    document.getElementById("present_card_name").innerText = present_card.name;
    document.getElementById("present_card_description").innerText =
      "Currently you may be experiencing the push of " +
      present_card.meanings.light.join(", ") +
      "\n\n";
    document.getElementById("present_card_description_shadow").innerText =
      "With push there is also pull, this card cast the shadow of " +
      present_card.meanings.shadow.join(", ") +
      "\n\n";
    document.getElementById("present_card_questions").innerText =
      "Today you should examine " +
      present_card.Questions_to_Ask.join(" ") +
      "\n\n";
    document.getElementById("present_card_fortune").innerText =
      "Looking forward you can expect " +
      present_card.fortune_telling.join(", ") +
      "\n\n";

    // future card
    let future_var = getCard();
    let future_card = getCardObject(`${future_var}.jpg`, jsonData);
    future_img.src = `./cards/${future_var}.jpg`;
    document.getElementById("future_header").innerText = "The Future ...";
    document.getElementById("future_card_name").innerText = future_card.name;
    document.getElementById("future_card_description").innerText =
      "Moving forward you can expect " +
      future_card.meanings.light.join(", ") +
      "\n\n";
    document.getElementById("future_card_description_shadow").innerText =
      "The future is never completely clear however you should know " +
      future_card.meanings.shadow.join(", ") +
      "\n\n";
    document.getElementById("future_card_questions").innerText =
      "Your future is yours to decide. " +
      future_card.fortune_telling.join(", ") +
      "\n\n";

    alert(
      "Take what you need leave what you don't, let your intuition be your true north."
    );
  } catch (error) {
    console.error("Error in getPastPresentFuture:", error);
    // Handle the error or notify the user appropriately
  }
}

// form reading - main function built of multiple functions to build readings
async function readingCall() {
  var reading_choice = document.getElementById("reading-options").value;

  //three card pull - past,present future
  if (reading_choice === "Past, Present, Future") {
    try {
      const jsonData = await loadJSON();

      // removes reading form
      var form_container = document.querySelector(".form-container");
      form_container.parentNode.removeChild(form_container);

      // past card
      let past_var = getCard();
      let past_card = getCardObject(`${past_var}.jpg`, jsonData);
      past_img.src = `./cards/${past_var}.jpg`;
      document.getElementById("past_header").innerText = "The Past ...";
      document.getElementById("past_card_name").innerText = past_card.name;
      document.getElementById("past_card_description").innerText =
        "In the past this card could mean " +
        past_card.meanings.light.join(", ") +
        "\n\n";
      document.getElementById("past_card_description_shadow").innerText =
        "You need to know that this could also mean " +
        past_card.meanings.shadow.join(", ") +
        "\n\n";
      document.getElementById("past_card_question").innerText =
        "As you move forward you should ask " +
        past_card.Questions_to_Ask.join(" ") +
        "\n\n";

      // present card
      let present_var = getCard();
      let present_card = getCardObject(`${present_var}.jpg`, jsonData);
      present_img.src = `./cards/${present_var}.jpg`;
      document.getElementById("present_header").innerText = "The Present ...";
      document.getElementById("present_card_name").innerText =
        present_card.name;
      document.getElementById("present_card_description").innerText =
        "Currently you may be experiencing the push of " +
        present_card.meanings.light.join(", ") +
        "\n\n";
      document.getElementById("present_card_description_shadow").innerText =
        "With push there is also pull, this card cast the shadow of " +
        present_card.meanings.shadow.join(", ") +
        "\n\n";
      document.getElementById("present_card_questions").innerText =
        "Today you should examine " +
        present_card.Questions_to_Ask.join(" ") +
        "\n\n";
      document.getElementById("present_card_fortune").innerText =
        "Looking forward you can expect " +
        present_card.fortune_telling.join(", ") +
        "\n\n";

      // future card
      let future_var = getCard();
      let future_card = getCardObject(`${future_var}.jpg`, jsonData);
      future_img.src = `./cards/${future_var}.jpg`;
      document.getElementById("future_header").innerText = "The Future ...";
      document.getElementById("future_card_name").innerText = future_card.name;
      document.getElementById("future_card_description").innerText =
        "Moving forward you can expect " +
        future_card.meanings.light.join(", ") +
        "\n\n";
      document.getElementById("future_card_description_shadow").innerText =
        "The future is never completely clear however you should know " +
        future_card.meanings.shadow.join(", ") +
        "\n\n";
      document.getElementById("future_card_questions").innerText =
        "Your future is yours to decide. " +
        future_card.fortune_telling.join(", ") +
        "\n\n";
    } catch (error) {
      console.error("Error in readingCall:", error);
    }
  }

  // single card pull option
  else if (reading_choice === "Single Card") {
    try {
      const jsonData = await loadJSON();
      // Removes reading form from view
      var form_container = document.querySelector(".form-container");
      form_container.parentNode.removeChild(form_container);
      // Removes extra cards
      var past_container = document.querySelector(".past-card-container");
      var future_container = document.querySelector(".future-card-container");
      if (past_container) past_container.parentNode.removeChild(past_container);
      if (future_container)
        future_container.parentNode.removeChild(future_container);

      // Present card
      let present_var = getCard();
      let present_card = getCardObject(`${present_var}.jpg`, jsonData);
      present_img.src = `./cards/${present_var}.jpg`;
      document.getElementById("present_card_name").innerText =
        present_card.name;
      document.getElementById("present_card_description").innerText =
        "Currently you may be experiencing the push of " +
        present_card.meanings.light.join(", ") +
        "\n\n";
      document.getElementById("present_card_description_shadow").innerText =
        "With push there is also pull, this card cast the shadow of " +
        present_card.meanings.shadow.join(", ") +
        "\n\n";
      document.getElementById("present_card_questions").innerText =
        "Today you should examine " +
        present_card.Questions_to_Ask.join(", ") +
        "\n\n";
      document.getElementById("present_card_fortune").innerText =
        "Looking forward you can expect " +
        present_card.fortune_telling.join(", ") +
        "\n\n";

      alert("Simple questions often find simple answers");
    } catch (error) {
      console.error("Error in readingCall:", error);
    }
  }
}

// onclick event to return and alert card details
function displayCardDetails(cardName) {
  loadJSON()
    .then((jsonData) => {
      const card = jsonData.cards.find((card) => card.name === cardName);
      if (card) {
        // Construct message with card information
        let message = `Card Name: ${card.name}\n\n`;
        message += "Fortune Telling:\n";
        message += card.fortune_telling.join("\n") + "\n\n";
        message += "Keywords:\n";
        message += card.keywords.join(", ") + "\n\n";
        message += "Meanings (Light):\n";
        message += card.meanings.light.join(", ") + "\n\n";
        message += "Meanings (Shadow):\n";
        message += card.meanings.shadow.join(", ") + "\n\n";
        message += "Questions to Ask:\n";
        message += card.Questions_to_Ask.join("\n");
        message += "Mythical/Spiritual:\n";
        message += card["Mythical/Spiritual"] + "\n\n";
        alert(message);
      } else {
        console.error(`Card '${cardName}' not found.`);
      }
    })
    .catch((error) => {
      console.error("Error loading JSON:", error);
    });
}
