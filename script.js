let apiKey = 'r7yduaipb8R6pIkZLHdfuweCM4nVN78w'
let hora = new Date().getHours()

function idCidade() {
    let cidade = document.getElementById('city').value
    if (cidade == '') {
        alert('Você deve informar uma cidade!!')
    } else {
        axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cidade}&language=pt-br`)
            .then(function (res) {
                let id = res.data[0]["Key"]
                return pegaClima(id)
            })
            .catch(function (error) {
                alert(`Erro ao tentar procurar a cidade ${cidade}.`)
            })
    }
}

function pegaClima(id) {
    axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${id}?apikey=${apiKey}&language=pt-br&metric=true`)
        .then(function (res) {
            let data = res.data.DailyForecasts[0]
            let info = {
                temp: {
                    min: data.Temperature.Minimum.Value,
                    max: data.Temperature.Maximum.Value,
                },
                chuva: data.Day.HasPrecipitation,
                extraInfo: {
                    dia: data.Day.IconPhrase,
                    noite: data.Night.IconPhrase
                }
            }
            return renderClima(info)
        })
        .catch(function (error) {
            console.warn('Não foi possível obter o clima!!')
        })
}

function renderClima(obj) {
    let inp = document.getElementById('city').value
    let nomeCidade = document.getElementById('nomeCidade')
    let maximo = document.getElementById('Max')
    let minimo = document.getElementById('Min')
    let infoExtra = document.getElementById('info')

    nomeCidade.innerText = inp

    minimo.innerHTML = `${obj.temp.min}<sup>°C</sup>`
    maximo.innerHTML = `${obj.temp.max}<sup>°C</sup>`
    if (hora >= 6 || hora < 18) {
        info.innerHTML = `<em>${obj.extraInfo.dia}</em>`
    } else {
        info.innerHTML = `<em>${obj.extraInfo.noite}</em>`
    }
}


