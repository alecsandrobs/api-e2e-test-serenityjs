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

    @peopleEdit
    Scenario Outline: Edit people
        Given that he sends a POST request to people endpoint with data
            | nome     | Manolo Bonifácio Leopoldino |
            | telefone | (48) 9 9988-7766            |
            | email    | manolo.leopoldino@gmail.com |
        When he sends a PUT request do people endpoint with data and its id
            | nome     | <nome>     |
            | telefone | <telefone> |
            | email    | <email>    |
        Then he should see that the person data was successfully updated

        Examples:
            | nome                            | telefone         | email                        |
            | Magnésia Bisurada do Patrocínio | (88) 9 9898-8989 | magnesia.patrocinio@mail.com |
            | Manoel Sovaco de Gambar         | (55) 9 9797-7979 | manoel.gambar@gamba.com.br   |

    @peopleDelete
    Scenario: Delete people
        Given that he sends a POST request to people endpoint with data
            | nome     | Manolo Bonifácio Leopoldino |
            | telefone | (48) 9 9988-7766            |
            | email    | manolo.leopoldino@gmail.com |
        When he sends a DELETE request to people endpoint with its id
        Then he should see that the person data was successfully removed

    @peopleSearch @peopleSearchAll
    Scenario: Search all people
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

    @peopleSearch @peopleSearchByName
    Scenario Outline: Search people by name
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

    @peopleSearch @peopleSearchById
    Scenario: Search person by id
        Given that he is aware that exists people
            | nome                                 | telefone         | email                         |
            | Magnésia Bisurada do Patrocínio      | (88) 9 9898-8989 | magnesia.patrocinio@mail.com  |
            | Manoel Sovaco de Gambar              | (55) 9 9797-7979 | manoel.gambar@gamba.com.br    |
            | Marciano Verdinho das Antenas Longas | 964785123        | marciano.longas@etmail.com.mt |
            | Maria Constança Dores Pança          | 57987654321      | maria.panca@barriga.com.br    |
            | Maria Cristina do Pinto              | (78) 99988-9595  | maria.pinto@email.com         |
            | Sete Chagas de Jesus e Salve Pátria  | 977777777        | setechagas.patria@email.com   |
        When he sends a GET request to people endpoint by its id
        Then he should see that the person data was successfully located