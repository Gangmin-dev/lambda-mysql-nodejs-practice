# lambda-mysql-nodejs-practice

api
https://ifgzf3qz3e.execute-api.ap-northeast-2.amazonaws.com/dev/class
method : GET
=> 모든 class 리스트 출력

https://ifgzf3qz3e.execute-api.ap-northeast-2.amazonaws.com/dev/class?id=#
method : GET
=> #에 해당하는 class에 속한 student들 출력

https://ifgzf3qz3e.execute-api.ap-northeast-2.amazonaws.com/dev/class/create
method : POST
type : json
"class_name"과 "teacher"이 key로 존재해야 함

https://ifgzf3qz3e.execute-api.ap-northeast-2.amazonaws.com/dev/class/update
method : POST
type : json
"id", "class_name"과 "teacher"이 key로 존재해야 함

https://ifgzf3qz3e.execute-api.ap-northeast-2.amazonaws.com/dev/class/delete?id=#
method : DELETE
=> id가 #인 class와 그 클래스의 모든 학생 삭제

https://ifgzf3qz3e.execute-api.ap-northeast-2.amazonaws.com/dev/class/create_student?id=#
method : POST
type : json
"name"과 "age"이 key로 존재해야 함
=> id=#인 class에 속하는 학생 생성
