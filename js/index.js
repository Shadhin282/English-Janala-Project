// api decleration
const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // return promise of response
    .then((res) => res.json())
    .then((json) => displayLessson(json.data));
};

// function decleration

const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn")
    // console.log(lessonBtn)
    lessonBtn.forEach(btn=> btn.classList.remove("active"))
}

const loadLevelWord = (id)=>  {
    // console.log(id)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    // console.log(url)
    fetch(url).then((res) => res.json()).then((data) => {
        removeActive();
        const clickBtn = document.getElementById(`level-btn-${id}`);
        
        clickBtn.classList.add("active")
        console.log(clickBtn)
        displayLevelWord(data.data)
    })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const res = await fetch(url);
    const details = await res.json();
    console.log(details)

}

const displayLevelWord = (words) => {
    // console.log(data.data)
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
                    <div class="font-bangla text-center col-span-full p-4">
                    <img class="mx-auto" src="./assets/alert-error.png">
                    <p class="text-gray-500 text-xl mb-10">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-5xl font-medium">নেক্সট Lesson এ যান</h1>
         </div>
        `;
        return;
    }

    words.forEach(word => {
        // console.log(word)
    
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word? word.word : "শব্দ পাওয়া যায় নি"}</h2>
            <p class="font-semibold">Meaning/Pronounciation</p>
            <div class="font-bangla text-2xl font-medium">
                ${word.meaning && word.word? word.meaning:"অর্থ পাওয়া যায় নি"} / ${word.pronunciation && word.word ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}
            </div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail-${word.id}" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>

         </div>
        `;

        wordContainer.append(card)
    })

};
const displayLessson = (lessons) => {
  // console.log(lessons)
  // 1. get the container
  const levelContainer = document.getElementById("level-container");

  // 2. get into every lessons
  for (let lesson of lessons) {
    // 3. Create element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
            <button id="level-btn-${lesson.level_no}"
             onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson ${lesson.level_no}</button>
        `;
      // 4. append
    levelContainer.append(btnDiv);
  }


};

// const load-word-detail
loadLessons();
