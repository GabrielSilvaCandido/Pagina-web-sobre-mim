// Obter a data atual
var currentDate = new Date();

// Obter o número do mês atual (0-11)
var currentMonth = currentDate.getMonth();

// Obter o ano atual
var currentYear = currentDate.getFullYear();

// Array com os nomes dos meses
var months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Array com os feriados em São Paulo (exemplo)
var holidays = [
  { day: 1, month: 0, description: "Ano Novo" },
  { day: 25, month: 0, description: "Aniversário de São Paulo" },
  { day: 21, month: 3, description: "Tiradentes" },
  { day: 1, month: 4, description: "Dia do Trabalho" },
  { day: 7, month: 5, description: "Corpus Christi" },
  { day: 9, month: 6, description: "Revolução Constitucionalista" },
  { day: 12, month: 9, description: "Nossa Senhora Aparecida" },
  { day: 2, month: 10, description: "Finados" },
  { day: 15, month: 10, description: "Proclamação da República" },
  { day: 25, month: 11, description: "Natal" }
];

// Criação do calendário
function createCalendar(month, year) {
  // Obter o elemento do calendário
  var calendar = document.getElementById("calendar");

  // Limpar o conteúdo do calendário
  calendar.innerHTML = "";

  // Criação do cabeçalho do calendário
  var header = document.createElement("h2");
  header.innerHTML = months[month] + " " + year;
  calendar.appendChild(header);

  // Criação da tabela do calendário
  var table = document.createElement("table");

  // Criação das linhas para os dias da semana
  var weekdaysRow = document.createElement("tr");
  for (var i = 0; i < 7; i++) {
    var weekdayCell = document.createElement("th");
    weekdayCell.innerHTML = getWeekdayName(i);
    weekdaysRow.appendChild(weekdayCell);
  }
  table.appendChild(weekdaysRow);

  // Obter o primeiro dia do mês
  var firstDay = new Date(year, month, 1);

  // Obter o número de dias no mês
  var daysInMonth = new Date(year, month + 1, 0).getDate();

  // Cálculo do número de células necessárias no calendário
  var totalCells = Math.ceil((firstDay.getDay() + daysInMonth) / 7) * 7;

  // Criação das células para os dias do mês
  var day = 1;
  for (var row = 0; row < totalCells / 7; row++) {
    var calendarRow = document.createElement("tr");

    for (var cell = 0; cell < 7; cell++) {
      var calendarCell = document.createElement("td");

      if (row === 0 && cell < firstDay.getDay()) {
        // Células vazias antes do primeiro dia do mês
        calendarCell.innerHTML = "";
      } else if (day > daysInMonth) {
        // Células vazias após o último dia do mês
        calendarCell.innerHTML = "";
      } else {
        // Células com os números dos dias
        calendarCell.innerHTML = day;
        if (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) {
          // Destacar o dia atual
          calendarCell.style.fontWeight = "bold";
        }

        // Verificar se a célula corresponde a um feriado
        for (var i = 0; i < holidays.length; i++) {
          if (day === holidays[i].day && month === holidays[i].month) {
            calendarCell.classList.add("holiday"); // Adicionar classe CSS para feriado
            calendarCell.title = holidays[i].description; // Exibir descrição do feriado ao passar o mouse
            break;
          }
        }

        // Verificar se a célula corresponde a um final de semana
        var currentDay = new Date(year, month, day).getDay();
        if (currentDay === 0 || currentDay === 6) {
          calendarCell.classList.add("weekend"); // Adicionar classe CSS para final de semana
        }

        day++;
      }

      calendarRow.appendChild(calendarCell);
    }

    table.appendChild(calendarRow);
  }

  calendar.appendChild(table);
}

// Função auxiliar para obter o nome do dia da semana
function getWeekdayName(weekday) {
  var weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  return weekdays[weekday];
}

// Função para avançar para o próximo mês
function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  createCalendar(currentMonth, currentYear);
}

// Função para voltar para o mês anterior
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  createCalendar(currentMonth, currentYear);
}

// Chamar a função para criar o calendário com o mês e ano atual
createCalendar(currentMonth, currentYear);
