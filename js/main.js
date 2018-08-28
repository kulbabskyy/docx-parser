document.addEventListener('DOMContentLoaded', function(){
    $('input#file').change(function(e){
        var fileName = e. target. files[0]. name;
        $('#filename').text(fileName);
    });

    $('a#clear').click(function(){
        $('#container').empty();
        $('#container').append('<span class="notConverted">Файл не конвертирован</span>')
        $('input#file').val("");
        $('#filename').text('Файл не выбран');
        $('a#clear').hide();
        $('#container').removeClass('converted');
    })
    
    
    var Mas = new Array;

    //Грузим контент из docx файла
    function $id(id) {
        return document.getElementById(id);
    }

    function convert() {
        var selected_file = $id('file').files[0];
        var reader = new FileReader();

        reader.onload = function (aEvent) {
            convertToPDF(btoa(aEvent.target.result));
        };

        //reader.readAsArrayBuffer(selected_file);
        reader.readAsBinaryString(selected_file);
    }

    function convertToPDF(aDocxContent) {
        var content = docx(aDocxContent);
        $id('container').textContent = '';

        //Здесь идет вывод строк на страницу, а так же их загрузка в массив
        while (content.DOM.length > 0 && content.DOM[0].textContent) {
            var node = content.DOM[0];
            var itemId = node.textContent.replace('[', '').replace(']', '').trim().split([':']);    // Формируем Id для каждого параграфа

            $id('container').appendChild(node).id = $.trim(itemId[0]);                              // Сам вывод на страницу. отключи если не нужен + добавление класса            

            str = node.textContent;
            str = str.replace('[', '').replace(']', '').trim().split([':']);                    // Удаляем все не нужное из строки и разделяем ее с помощью сеппаратора на 2 части
            Mas[str[0].trim()] = $.trim(str[1]);                                                // Помещаем каждую данные в массив
            
            //console.log(str[0])                                                               // вывести только названия полей
            //console.log(str[1])                                                               // вывести только значения полей
        }
        
        console.log('Значение DistToGo = ' + Mas['DistToGo'])                                       // пример того как обращаться к переменным из массива. Просто по имени  Mas['DistToGo']
        console.log(Mas)                                                                            // Вывести весь массив
        appendClick();                                                                              // Подключаем клики к параграфам
        $('a#clear').css('display','inline-block');
        $('a#clear').show();
        $('#container').addClass('converted');
    }

    window.addEventListener('load', function () {
        document.getElementById('convert').onclick = convert;
    });

    //Функция для вывода модального окна
    function appendClick() {
        $('#container p').each(function(){
            $(this).click(function(){
                swal($(this).attr('id'), Mas[$(this).attr('id')], "success");                      // выводим значения из массива
            })
        })
    }
    
});