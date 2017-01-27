import express from 'express'

const roles = (router, Roles) => {

  const getRoles = async res => res.status(200).json(await Roles().select())

  router.route('/roles')

    .get((req, res) => getRoles(res))

}

export default roles
