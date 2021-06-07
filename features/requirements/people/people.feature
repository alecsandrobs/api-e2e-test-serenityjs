# language: en

@people
Feature: People register
    As an user of the system
    John watns to register people
    So that he can insert, edit, remove or just search for people

    Background:
    Dado that John is a system user

    @peopleInsert
    Scenario: Insert person
        When he sends a POST request to people endpoint with data
            | nome     | Manolo Bonifácio Leopoldino |
            | telefone | (48) 9 9988-7766            |
            | email    | manolo.leopoldino@gmail.com |
        Then he should see that the person data was successfully created

    @peopleInsert
    Scenario Outline: Insert people
        When he sends a POST request to people endpoint with data
            | nome     | <nome>     |
            | telefone | <telefone> |
            | email    | <email>    |
        Then he should see that the person data was successfully created

        Examples:
            | nome                        | telefone         | email                       |
            | Manolo Bonifácio Leopoldino | (48) 9 9988-7766 | manolo.leopoldino@gmail.com |
            | Cacilda Bondade Alencar     | (48) 9 9765-4321 | cacilda-alencar@gmail.com   |

    @peopleEditar
    Scenario Outline: Editar pessoas
        Given that he sends a POST request to people endpoint with data
            | nome     | Manolo Bonifácio Leopoldino |
            | telefone | (48) 9 9988-7766            |
            | email    | manolo.leopoldino@gmail.com |
        When ele envia uma requisição PUT para o endpoint de pessoas com os dados para o identificador da pessoa
            | nome     | <nome>     |
            | telefone | <telefone> |
            | email    | <email>    |
        Then ele deveria ver que o registro da pessoa foi alterado com sucesso

        Examples:
            | nome                            | telefone         | email                        |
            | Magnésia Bisurada do Patrocínio | (88) 9 9898-8989 | magnesia.patrocinio@mail.com |
            | Manoel Sovaco de Gambar         | (55) 9 9797-7979 | manoel.gambar@gamba.com.br   |

    @peopleExcluir
    Scenario: Excluir pessoa
        Given that he sends a POST request to people endpoint with data
            | nome     | Manolo Bonifácio Leopoldino |
            | telefone | (48) 9 9988-7766            |
            | email    | manolo.leopoldino@gmail.com |
        When ele envia uma requisição DELETE para o endpoint de pessoas com seu identificador
        Then ele deveria ver que o registro da pessoa foi removido com sucesso

    @peoplePesquisar @peoplePesquisarTodos
    Scenario: Pesquisar pessoas com filtro
        Given that he is aware that exists people
            | nome                                 | telefone         | email                         |
            | Magnésia Bisurada do Patrocínio      | (88) 9 9898-8989 | magnesia.patrocinio@mail.com  |
            | Manoel Sovaco de Gambar              | (55) 9 9797-7979 | manoel.gambar@gamba.com.br    |
            | Marciano Verdinho das Antenas Longas | 964785123        | marciano.longas@etmail.com.mt |
            | Maria Constança Dores Pança          | 57987654321      | maria.panca@barriga.com.br    |
            | Maria Cristina do Pinto              | (78) 99988-9595  | maria.pinto@email.com         |
            | Sete Chagas de Jesus e Salve Pátria  | 977777777        | setechagas.patria@email.com   |
        When he sends a GET request to people endpoint
        Then he should see that the people list have 6 records

    @peoplePesquisar @peoplePesquisarPeloNome
    Scenario Outline: Pesquisar pessoas filtrando pelo nome
        Given that he is aware that exists people
            | nome                                 | telefone         | email                         |
            | Magnésia Bisurada do Patrocínio      | (88) 9 9898-8989 | magnesia.patrocinio@mail.com  |
            | Manoel Sovaco de Gambar              | (55) 9 9797-7979 | manoel.gambar@gamba.com.br    |
            | Marciano Verdinho das Antenas Longas | 964785123        | marciano.longas@etmail.com.mt |
            | Maria Constança Dores Pança          | 57987654321      | maria.panca@barriga.com.br    |
            | Maria Cristina do Pinto              | (78) 99988-9595  | maria.pinto@email.com         |
            | Sete Chagas de Jesus e Salve Pátria  | 977777777        | setechagas.patria@email.com   |
        When he sends a GET request to people endpoint filtering by name "<name>"
        Then he should see that the people list have <amount> records

        Examples:
            | name   | amount |
            | Sovaco | 1      |
            | Maria  | 2      |
            | do     | 3      |

    @peoplePesquisar @peoplePesquisarPeloId
    Scenario: Pesquisar pessoas pelo id
        Given that he is aware that exists people
            | nome                                 | telefone         | email                         |
            | Magnésia Bisurada do Patrocínio      | (88) 9 9898-8989 | magnesia.patrocinio@mail.com  |
            | Manoel Sovaco de Gambar              | (55) 9 9797-7979 | manoel.gambar@gamba.com.br    |
            | Marciano Verdinho das Antenas Longas | 964785123        | marciano.longas@etmail.com.mt |
            | Maria Constança Dores Pança          | 57987654321      | maria.panca@barriga.com.br    |
            | Maria Cristina do Pinto              | (78) 99988-9595  | maria.pinto@email.com         |
            | Sete Chagas de Jesus e Salve Pátria  | 977777777        | setechagas.patria@email.com   |
        When ele envia uma requisição GET para o endpoint de pessoas especificando um identificador válido
        Then ele deveria ver que o registro da pessoa foi buscado com sucesso