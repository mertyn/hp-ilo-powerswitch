$request = @{
    Uri         = 'http://localhost:5000/api/notification'
    Method      = 'POST'
    ContentType = 'application/json'
    Body        = '{ "token": "lol" }'
}

$response = Invoke-RestMethod @request
echo $response