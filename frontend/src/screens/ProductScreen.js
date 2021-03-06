import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap"
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetails
        // fires as soon as the page loads, so put axios request in here to get products as component loads
        useEffect(() => {
            dispatch(listProductDetails(match.params.id))
            
        }, [dispatch, match])

    return (
        <>
            <Link className="btn btn-light my-3" to='/'>
                Go Back
            </Link>
            { loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Row>
                <Col med={6}>
                    <Image src = {product.image} alt = {product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h3>{product.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating 
                                value = {product.rating} 
                                text={`${product.numReviews} reviews`} 
                            />
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${product.price}
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: ${product.description}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'InStock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            )}
        </>
    )
}

export default ProductScreen
