# Mongoose schema, perchè?
mongodb è un database NoSql che permette di salvare oggetti altamente destrutturati. Si basa sul concetto di documento (singola entità salvata nel database) e collezioni (insieme di documenti). I documenti vengono salvati attraverso una rappresentazione json. I documenti, all'interno della stessa collezione, non hanno una rappresentazione predefinita, ognuno di essi può avere attributi diversi. Per dare ordine a questa natura altamente dinamica, in mongoose hanno aggiunto il concetto di schema, che si avvicina al concetto di classe nella programmazione ad oggetti. Attraverso questi file si va a descrivere quella che sarà la struttura dei documenti salvati della stessa collezione, rendendo così più semplice l'interrogazione delle collezioni mongodb. In questa cartella sono descritti i vari Schema per i nostri oggetti del dominio.