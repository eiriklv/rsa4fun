rsa4fun
==========

Public / Private key cryptography

An simple implementation of the RSA algorithm
Just for fun and learning :)

This implementation isn't really secure at all,
as it converts each character in the message string
to the corresponding character code (0-255),
and then encrypts each character individually.
So by encrypting with a public key, you would know
the encrypted version of each character by encrypting
the alphabet and creating a reverse lookup list.