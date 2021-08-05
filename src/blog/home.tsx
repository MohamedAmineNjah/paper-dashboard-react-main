import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../index2';
import { getAllBlogs,reset } from './blogs.reducer'
import { Button, Col, Table } from 'reactstrap';
import { Grid } from '@material-ui/core';





export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps { }


const Home = (props: IHomeProp) => {

    useEffect(() => {
        props.getAllBlogs();
        console.log(props.bloglist)
    }, []);// une seule fois au moment de l'aff de page
    
    

const deletecat = (id : any) =>{
   console.log(id);
   
}

    return (
       
        <Grid item className="justify-content-center" style={{ padding: "6%" }}>
            <Col sm="12">
                <h2 id="client-heading"> Liste des Blogs  </h2>
                <Grid container item xs={2} direction="row-reverse" justify="flex-start">
                    <Button
                        tag={Link}
                        to={`new`}
                        color="primary"
                        size="md"

                    >

                        <span className="d-none d-md-inline">
                            Ajouter Blog
                                                        </span>
                    </Button>
                </Grid>


            </Col>



            <Col sm="12">
                <Table hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th className="hand" >
                              
                                    ID
                                       

                            </th>
                            <th className="hand" >
                                Name
                                      
                            </th>
                            <th className="hand">
                                Handle
                                    </th>
                            <th className="hand">
                                User
                                    </th>
                                    <th className="hand">
                                Action
                                    </th>
                        </tr>
                    </thead>
                    {props.bloglist && props.bloglist.length > 0 ? (      
                        <tbody>
                            {props.bloglist.map((blog: any, i: any) => (   
                                <tr key={`entity-${i}`}>
                                    <td>{blog.id}</td>

                                    <td>{blog.name}</td>
                                    <td>{blog.handle}</td>

                                    <td>
                                    {blog.user ? 
                                        blog.user.login
                                        : 'null'}
                                        </td>
                                   

                                    <td className="text-right">
                                        <div className="btn-group flex-btn-group-container">
                                            <Button
                                                tag={Link}
                                                to={`${blog.id}/edit`}
                                                color="info"
                                                size="sm"
                                            >

                                                <span className="d-none d-md-inline">
                                                    Edit
                                                        </span>
                                            </Button>
                                            <Button
                                                color="warning"
                                                size="sm"
                                                onClick={() => deletecat(blog.id)}
                                               //onClick={deletecat.bind(this,categorie.id)}
                                            >

                                                <span className="d-none d-md-inline">
                                                    Delete
                                                        </span>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (

                            <div className="alert alert-warning">
                                No product found
                            </div>

                        )}
                </Table>
            </Col>

        </Grid >
        
    );
}



const mapStateToProps = ({ blog }: IRootState) => ({
  
    bloglist: blog.entities,
    categorientity: blog.entity,
    updateSuccess: blog.updateSuccess,

});

const mapDispatchToProps = {
    getAllBlogs,
    reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
