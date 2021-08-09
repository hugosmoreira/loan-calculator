// Listen for submit

document.getElementById("loan-form").addEventListener("submit", function (e) {
  // esconder defaults

  document.getElementById("results").style.display = "none";

  // mostrar o loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculando resultados

function calculateResults(e) {
  // variaveis UI
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // computar os pagamentos mensais ou seja monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //show results
    document.getElementById("results").style.display = "block";

    // esconder loading
    document.getElementById("loading").style.display = "none";
  } else {
    showError("please check your numbers");
  }
}

// criando funcao showError

function showError(error) {
  // criando div com js
  const errorDiv = document.createElement("div");

  //pegando elementos

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // adicionando classe
  errorDiv.className = "alert alert-danger";

  // criando text node e append to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert error above heading

  card.insertBefore(errorDiv, heading);

  // Limpando erro depois de 3 segundos

  setTimeout(clearError, 3000);
}

// criando clearError

function clearError() {
  document.querySelector(".alert").remove();
}
