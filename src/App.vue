<template>
  <div id="app" class="quiz-container">
    <div v-if="gameOver" class="quiz-header">
      <h1>Résultats du Quiz</h1>
      <p>Vous avez répondu correctement à {{ correctAnswers }} questions sur {{ usedPhrases.length }}.</p>
      <button @click="resetQuiz" class="reset-button">Recommencer</button>
    </div>

    <div v-else>
      <div class="quiz-header">
        <h1>Quiz : Associe les phrases</h1>
        <p class="total-phrases">Nombre total de phrases : {{ totalPhrases }}</p>
        <p class="question">{{ currentPhrase.phraseA }}</p>
      </div>

      <div class="options">
        <button
            v-for="(phrase, index) in shuffledPropositions"
            :key="index"
            class="option-button"
            @click="checkAnswer(phrase)"
        >
          {{ phrase }}
        </button>
      </div>

      <div v-if="feedback" class="feedback">
        <p>{{ feedback }}</p>
        <button v-if="!gameOver" @click="nextQuestion" class="next-button">Question suivante</button>
      </div>

      <div class="score">
        <p>Score : {{ correctAnswers }} / {{ usedPhrases.length }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phrases: [],
      currentPhrase: {},
      correctAnswer: '',
      propositions: [],
      usedPhrases: [],
      feedback: '',
      correctAnswers: 0,
      gameOver: false,
      totalPhrases: 0,
    };
  },
  computed: {
    shuffledPropositions() {
      return [...this.propositions].sort(() => Math.random() - 0.5);
    },
  },
  methods: {
    async loadPhrases() {
      const response = await fetch('phrases.json');
      this.phrases = await response.json();
      this.totalPhrases = this.phrases.length;
      this.nextQuestion();
    },
    nextQuestion() {
      if (this.usedPhrases.length === this.phrases.length) {
        this.gameOver = true;
        return;
      }

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * this.phrases.length);
      } while (this.usedPhrases.includes(randomIndex));

      this.currentPhrase = this.phrases[randomIndex];
      this.correctAnswer = this.currentPhrase.phraseB;
      this.usedPhrases.push(randomIndex);

      const incorrectAnswers = this.phrases
          .filter((p) => p.phraseB !== this.correctAnswer)
          .map((p) => p.phraseB)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

      this.propositions = [this.correctAnswer, ...incorrectAnswers];
      this.feedback = '';
    },
    checkAnswer(selected) {
      if (selected === this.correctAnswer) {
        this.feedback = 'Bonne réponse ! 🎉';
        this.correctAnswers++;
      } else {
        this.feedback = `Mauvaise réponse. La bonne réponse était : ${this.correctAnswer} 😔`;
      }
    },
    resetQuiz() {
      this.usedPhrases = [];
      this.correctAnswers = 0;
      this.gameOver = false;
      this.nextQuestion();
    },
  },
  mounted() {
    this.loadPhrases();
  },
};
</script>

<style scoped>
.quiz-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.quiz-header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.quiz-header .total-phrases {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
}

.quiz-header .question {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 20px;
}

.options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.option-button {
  background-color: #0066cc;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.option-button:hover {
  background-color: #004d99;
}

.feedback {
  margin-top: 20px;
}

.feedback p {
  font-size: 1.2rem;
  color: #333;
}

.next-button {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
}

.next-button:hover {
  background-color: #218838;
}

.score {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #333;
}

.reset-button {
  background-color: #ff5733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
}

.reset-button:hover {
  background-color: #c4451f;
}
</style>
