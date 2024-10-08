fetch('curriculum.json')                                                 //fetch the data from the json
    .then(response => response.json())                                   //if the data fulfilled then it converted into JSON format
    .then(courses => {                                                   //courses is a curriculum information, it serves as the table body
        const gradesTable = document.getElementById('grades-table');     //this where to identified the JS where to put the data into HTML

        courses.forEach(semester => {                                    //where each courses display/loop also the semester
            const table = document.createElement('table');               //this where to create a new table
            table.className = 'grades-table';                            // Assign class here CSS purpose

            const colgroup = document.createElement('colgroup');
            for (let i = 0; i < 7; i++) {  // 7 columns as defined in your header
                const col = document.createElement('col');
                col.style.width = '14.28%';  // Equally distribute the width (100% / 7 = ~14.28%)
                colgroup.appendChild(col);
            }
            table.appendChild(colgroup);

            const headerRow = table.insertRow();                         //insert a row into the table that serves a header now
            headerRow.insertCell().colSpan = 7;                          //to craete a span of 7 columns
            headerRow.cells[0].textContent = semester.semester;          //sets header into semester from json information
            headerRow.className = 'sem';                                 // Assign class to the semester row for CSS purpose

            const headerCells = ['Course', 'Description', 'Unit', 'Grade', 'Remarks', 'Course', 'Term'];   //defines the column array of the table
            const headerRow2 = table.insertRow();                        //where it create second row of the table
            headerCells.forEach(cellText => {                            //loops trough the table until it end 
                const th = document.createElement('th');                 //where I create a table header <th>
                th.textContent = cellText;                               //where it set the textcontent of the th is the cell
                headerRow2.appendChild(th);                              //follow the first table
            });

            semester.courses.forEach(course => {                         //where it loops each course every semester array
                const row = table.insertRow();                           //then after that it create row each loop
                
                let cssclass;
                switch (course.remarks) {
                    case "Passed":
                        cssclass = "table-body-taken";
                        break;
                    case "":
                        cssclass = "table-body-not-taken";
                        break;
                    case "In progress":
                        cssclass = "table-body-in-progress";
                        break;
                    default:
                        cssclass = "";
                }

                row.className = cssclass;  // Assign the CSS class to the row

                row.insertCell().textContent = course.courseCode;        //each loops that insert each loops fills of json
                row.insertCell().textContent = course.description;
                row.insertCell().textContent = course.unit;
                row.insertCell().textContent = course.grade;
                row.insertCell().textContent = course.remarks;
                row.insertCell().textContent = course.courseCode;
                row.insertCell().textContent = course.term;              //until here!
            });

            gradesTable.appendChild(table);                              //where append in the gradesTable

            
        });
        
    })
    .catch(error => console.error('Error loading data:', error));

    
