const questions = [
  ['Saya menggunakan kata sandi kuat dan berbeda untuk akun penting.', 'Password'],
  ['Saya mengaktifkan MFA/2FA jika tersedia.', 'Password'],
  ['Saya tidak membagikan kata sandi atau kode OTP.', 'Password'],
  ['Saya memeriksa alamat pengirim dan tautan sebelum membukanya.', 'Phishing'],
  ['Saya waspada terhadap pesan mendesak yang meminta data pribadi.', 'Phishing'],
  ['Sistem operasi dan aplikasi saya diperbarui berkala.', 'Pembaruan'],
  ['Saya memasang aplikasi hanya dari sumber tepercaya.', 'Pembaruan'],
  ['Saya mencadangkan file penting di lokasi terpisah.', 'Backup'],
  ['Saya mengunci layar perangkat saat tidak digunakan.', 'Perangkat'],
  ['Saya menghindari aktivitas sensitif di Wi-Fi publik tak tepercaya.', 'Perangkat'],
];

const points = { ya: 10, kadang: 5, tidak: 0 };
const tips = {
  Password: 'Aktifkan MFA, gunakan kata sandi unik, dan jangan bagikan OTP.',
  Phishing: 'Periksa alamat pengirim dan URL; jangan terburu-buru membuka tautan.',
  Pembaruan: 'Aktifkan pembaruan otomatis dan pasang aplikasi dari sumber resmi.',
  Backup: 'Buat cadangan rutin dan simpan salinan di lokasi terpisah.',
  Perangkat: 'Kunci layar dan hindari aktivitas sensitif di jaringan publik.',
};

const questionsContainer = document.querySelector('#questions');
const form = document.querySelector('#assessment-form');

questionsContainer.innerHTML = questions.map(([text], index) => `
  <fieldset class="question">
    <legend>
      <span class="num">${String(index + 1).padStart(2, '0')}</span>
      ${text}
    </legend>
    <div class="options">
      ${Object.keys(points).map((answer) => `
        <label>
          <input type="radio" name="q${index}" value="${answer}" required>
          <span>${answer[0].toUpperCase()}${answer.slice(1)}</span>
        </label>
      `).join('')}
    </div>
  </fieldset>
`).join('');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const answers = questions.map((_, index) => (
    form.querySelector(`input[name="q${index}"]:checked`)
  ));

  if (answers.some((answer) => !answer)) {
    return;
  }

  const score = answers.reduce(
    (total, answer) => total + points[answer.value],
    0,
  );
  const categoryScores = {};

  questions.forEach(([, category], index) => {
    categoryScores[category] ??= { score: 0, max: 0 };
    categoryScores[category].score += points[answers[index].value];
    categoryScores[category].max += 10;
  });

  const categoryPercentages = Object.entries(categoryScores).map(
    ([name, value]) => [name, Math.round((value.score / value.max) * 100)],
  );
  const weakest = categoryPercentages.reduce((lowest, current) => (
    current[1] < lowest[1] ? current : lowest
  ));
  const level = score >= 80 ? 'Tinggi' : score >= 50 ? 'Sedang' : 'Rendah';
  const result = document.querySelector('#result');
  const username = document.querySelector('#username').value.trim();

  document.querySelector('#score').textContent = score;
  document.querySelector('#score-ring').style.setProperty('--angle', `${score * 3.6}deg`);
  document.querySelector('#result-level').textContent = `KATEGORI ${level.toUpperCase()}`;
  document.querySelector('#user-greeting').textContent =
    username ? `Hasil pemeriksaan untuk ${username}.` : '';
  document.querySelector('#result-message').textContent = score >= 80
    ? 'Kebiasaan keamanan digitalmu sudah cukup baik. Pertahankan.'
    : score >= 50
      ? 'Beberapa kebiasaan sudah baik, tetapi masih ada area yang perlu diperkuat.'
      : 'Ada kebiasaan penting yang perlu diperbaiki untuk mengurangi risiko digital.';
  document.querySelector('#result-tip').textContent =
    `${weakest[0]} perlu diperhatikan. ${tips[weakest[0]]}`;

  document.querySelector('#categories').innerHTML = categoryPercentages.map(
    ([name, percentage]) => `
      <div>
        <label>${name} <b>${percentage}%</b></label>
        <div class="track"><span style="width: ${percentage}%"></span></div>
      </div>
    `,
  ).join('');

  result.hidden = false;
  result.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
