class Carro {
	constructor(nome, email, ano, mes, dia, categoria, descricao, cidade, cor, km, motor, preco) {
		this.nome = nome
		this.email = email
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.categoria = categoria
		this.descricao = descricao
		this.cidade = cidade
		this.cor = cor
		this.km = km
		this.motor = motor
		this.preco = preco		
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}	

	recuperarTodososRegistros() {

		//array de carros
		let carros = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as carros cadastradas em localStorage
		for (let i = 1; i <= id; i++) {

			//recuperar a carro
			let carro = JSON.parse(localStorage.getItem(i))

			//existe a possibilidade de haver indíces que foram pulados/removidos
			//nestes casos, vamos pular estes índices
			if (carro === null) {
				continue
			}

			carro.id = i
			carros.push(carro)
		}

		return carros
	}

	pesquisar(carro) {

		let carrosFiltrados = Array()

		carrosFiltrados = this.recuperarTodososRegistros()

		console.log(carro)

		console.log(carrosFiltrados)

		//nome do vendedor
		if(carro.nome != '') {
			console.log('Filtro do nome do vendedor')
			carrosFiltrados = carrosFiltrados.filter(d => d.nome == carro.nome)
		}

		//email do vendedor
		if(carro.email != '') {
			console.log('Filtro do email do vendedor')
			carrosFiltrados = carrosFiltrados.filter(d => d.email == carro.email)
		}

		//ano
		if(carro.ano != '') {
			console.log('Filtro de ano')
			carrosFiltrados = carrosFiltrados.filter(d => d.ano == carro.ano)
		}

		//mes
		if(carro.mes != '') {
			console.log('Filtro de mes')
			carrosFiltrados = carrosFiltrados.filter(d => d.mes == carro.mes)
		}

		//dia
		if(carro.dia != '') {
			console.log('Filtro de dia')
			carrosFiltrados = carrosFiltrados.filter(d => d.dia == carro.dia)
		}

		//categoria
		if(carro.categoria != '') {
			console.log('Filtro de categoria')
			carrosFiltrados = carrosFiltrados.filter(d => d.categoria == carro.categoria)
		}

		//descricao
		if(carro.descricao != '') {
			console.log('Filtro de descricao')
			carrosFiltrados = carrosFiltrados.filter(d => d.descricao == carro.descricao)
		}

		//cidade
		if(carro.cidade != '') {
			console.log('Filtro de cidade')
			carrosFiltrados = carrosFiltrados.filter(d => d.cidade == carro.cidade)
		}

		//cor
		if(carro.cor != '') {
			console.log('Filtro de cor')
			carrosFiltrados = carrosFiltrados.filter(d => d.cor == carro.cor)
		}

		//km
		if(carro.km != '') {
			console.log('Filtro de km')
			carrosFiltrados = carrosFiltrados.filter(d => d.km == carro.km)
		}

		//motor
		if(carro.motor != '') {
			console.log('Filtro de motor')
			carrosFiltrados = carrosFiltrados.filter(d => d.motor == carro.motor)
		}

		//preco
		if(carro.preco != '') {
			console.log('Filtro de preco')
			carrosFiltrados = carrosFiltrados.filter(d => d.preco == carro.preco)
		}

		return carrosFiltrados
	}

	remover(id) {
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function cadastrarCarro() {
	
	let nome = document.getElementById('nome')
	let email = document.getElementById('email')
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let categoria = document.getElementById('categoria')
	let descricao = document.getElementById('descricao')
	let cidade = document.getElementById('cidade')
	let cor = document.getElementById('cor')	
	let km = document.getElementById('km')
	let motor = document.getElementById('motor')
	let preco = document.getElementById('preco')

	let carro = new Carro (
		nome.value, 
		email.value, 
		ano.value, 
		mes.value, 
		dia.value, 
		categoria.value, 
		descricao.value, 
		cidade.value, 
		cor.value, 
		km.value, 
		motor.value, 
		preco.value
		)

	if (carro.validarDados()) {
		bd.gravar(carro)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Solicitação de venda registrada com sucesso! Daqui a 30 minutos, verifique seu e-mail e, se aceitarmos sua solicitação, envie um e-mail para registrousados@gwdod com as fotos do carro e da documentação em anexo.'
		document.getElementById('modal_btn').className = 'btn btn-success'
		document.getElementById('modal_btn').innerHTML = 'Voltar'

		//dialog de sucesso!
		$('#modalRegistraCarro').modal('show')

		nome.value = ''
		email.value = ''
		ano.value = ''
		mes.value = ''
		dia.value = ''
		categoria.value = ''
		descricao.value = ''
		cidade.value ='' 
		cor.value = ''
		km.value = ''
		motor.value = ''
		preco.value = ''

	} else {

		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro!'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na solicitação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'btn btn-danger'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'

		//dialog de erro!
		$('#modalRegistraCarro').modal('show')
	}
}

function carregaListaCarros(carros = Array(), filtro = false) {

	if (carros.length == 0 && filtro == false) {
		carros = bd.recuperarTodososRegistros()
	}

	//selecionando o elemento tbody da tabela!
	let listaCarros = document.getElementById('listaCarros')
	listaCarros.innerHTML = '' 

  //percorrer o array carros, listando cada carro de forma dinâmica
  carros.forEach(function(d) {

  		//console.log(d)

	  	//criando a linha (tr)
	  	let linha = listaCarros.insertRow()

	  	//criar as colunas (tds)
	  	linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

	  	//ajustar o categoria
	  	switch(d.categoria) {
	  		case '1': d.categoria = 'Hatch'
	  			break
	  		case '2': d.categoria = 'Sedan'
	  			break
	  		case '3': d.categoria = 'SUV'
	  			break
	  		case '4': d.categoria = 'Perua'
	  			break
	  		case '5': d.categoria = 'Picape'
	  			break	

	  	}

	  	linha.insertCell(1).innerHTML = d.nome
	  	linha.insertCell(2).innerHTML = d.email
	  	linha.insertCell(3).innerHTML = d.ano
	  	linha.insertCell(4).innerHTML = d.mes
	  	linha.insertCell(5).innerHTML = d.dia
	  	linha.insertCell(6).innerHTML = d.categoria
	  	linha.insertCell(7).innerHTML = d.descrição
	  	linha.insertCell(8).innerHTML = d.cidade
	  	linha.insertCell(9).innerHTML = d.cor
	  	linha.insertCell(10).innerHTML = d.km
	  	linha.insertCell(11).innerHTML = d.motor
	  	linha.insertCell(12).innerHTML = d.preco


	  	//criar botão de exculsão
	  	let btn = document.createElement("button")
	  	btn.className = 'btn btn-danger'
	  	btn.innerHTML = '<i class="fas fa-times"></i>'
	  	btn.id = `id_carro_${d.id}`
	  	linha.insertCell(4).append(btn)

	  	console.log(d)

  })

}

function pesquisarCarros() {
	let nome = document.getElementById('nome').value
	let email = document.getElementById('email').value
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let categoria = document.getElementById('categoria').value
	let descricao = document.getElementById('descricao').value
	let cidade = document.getElementById('cidade').value
	let cor = document.getElementById('cor').value
	let km = document.getElementById('km').value
	let motor = document.getElementById('motor').value
	let preco = document.getElementById('preco').value

	let carro = new Carro(nome, email, ano, mes, dia, categoria, descricao, cidade, cor, km, motor, preco)

	let carros = bd.pesquisar(carro)

	this.carregaListaCarros(carros, true)


}