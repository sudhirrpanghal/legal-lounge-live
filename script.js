const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

// Mobile navigation
const menuToggle = $('#menuToggle');
const mainNav = $('#mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
$$('#mainNav a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false');
}));

// Article category and keyword search
let activeFilter = 'All';
const searchInput = $('#articleSearch');
function filterArticles(){
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  $$('.article-card').forEach(card => {
    const categoryMatch = activeFilter === 'All' || card.dataset.category === activeFilter;
    const textMatch = `${card.dataset.search} ${card.innerText}`.toLowerCase().includes(term);
    const show = categoryMatch && textMatch;
    card.hidden = !show;
    if(show) visible++;
  });
  $('#emptyState').hidden = visible > 0;
}
searchInput.addEventListener('input', filterArticles);
$$('.filter').forEach(button => button.addEventListener('click', () => {
  $$('.filter').forEach(b => b.classList.remove('active'));
  button.classList.add('active'); activeFilter = button.dataset.filter; filterArticles();
}));

// Quiz demo
const quizPanel = $('#quizPanel');
$('#startQuiz').addEventListener('click', () => { quizPanel.hidden = false; quizPanel.scrollIntoView({behavior:'smooth',block:'center'}); });
$('#closeQuiz').addEventListener('click', () => quizPanel.hidden = true);
$$('.quiz-options button').forEach(button => button.addEventListener('click', () => {
  $$('.quiz-options button').forEach(b => {b.disabled=true; b.classList.remove('correct','incorrect');});
  const correct = button.dataset.answer === 'correct';
  button.classList.add(correct ? 'correct' : 'incorrect');
  if(!correct) $('.quiz-options [data-answer="correct"]').classList.add('correct');
  $('#quizFeedback').textContent = correct
    ? 'Correct. Article 14 guarantees equality before the law and equal protection of the laws. Explore the text and its interpretation for the full context.'
    : 'Not quite. The answer is Article 14. It guarantees equality before the law and equal protection of the laws.';
  $('#nextQuiz').hidden = false;
}));
$('#nextQuiz').addEventListener('click', () => {
  $$('.quiz-options button').forEach(b => {b.disabled=false; b.classList.remove('correct','incorrect');});
  $('#quizFeedback').textContent = 'You have completed this sample quiz. More questions can be added to the quiz bank.';
  $('#nextQuiz').hidden = true;
});

// Decision Room scenario
const scenarioMessages = {
  A: 'A careful first step. The contract, reason for termination, relevant facts, and applicable law help identify the rights and possible remedies. The answer may vary with the worker’s status and jurisdiction.',
  B: 'That conclusion is too broad. Notice requirements and lawful grounds depend on the contract, employment category, applicable legislation, and facts. Avoid assuming the outcome before reviewing them.',
  C: 'Skipping the facts risks missing important legal conditions. A sound analysis identifies the documents, timeline, employment status, and governing law before reaching a conclusion.'
};
$$('.scenario-options button').forEach(button => button.addEventListener('click', () => {
  $$('.scenario-options button').forEach(b => b.classList.remove('selected'));
  button.classList.add('selected');
  $('#scenarioResult').textContent = scenarioMessages[button.dataset.scenario];
  $('#resetScenario').hidden = false;
}));
$('#resetScenario').addEventListener('click', () => {
  $$('.scenario-options button').forEach(b => b.classList.remove('selected'));
  $('#scenarioResult').textContent = '';
  $('#resetScenario').hidden = true;
});

// Demo links are intentionally not connected to unpublished article pages.
$$('[data-demo-link]').forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); alert('This is a homepage prototype. Replace this demo link with your published Legal Lounge Live article URL.');
}));
$('#year').textContent = new Date().getFullYear();
