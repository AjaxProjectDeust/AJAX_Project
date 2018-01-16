<?php
function lanceDe()
{
    return rand(1,6);
}

function lanceDes ()
{
    return array(lanceDe(),lanceDe(),lanceDe());
}
?>