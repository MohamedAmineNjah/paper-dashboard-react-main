import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from '../index2';

import { getAllBlogs, createEntity, getEntity, reset as resetSousRachOperation } from './blogs.reducer';
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';

export interface IBlogUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const BlogUpdate = (props: IBlogUpdateProps) => {
  const [isNew, setIsNew] = useState(window.location.pathname.includes("new"));
  const { register, handleSubmit, control, reset } = useForm();

  const handleClose = () => {
    props.history.push('/admin/blog');
  };


  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.location.pathname.split(/\//)[2]);
    }
  }, []);
  useEffect(() => {
    if (isNew) {
      reset({});
    } else {
      console.log(props.blogEntity)
      reset({
        ...props.blogEntity,
      });

    }
  }, [props.blogEntity]);





  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);



  const onSubmit = (data: any) => {
    let values = { ...data };
    if (isNew) {
      console.log(values);
      props.createEntity(values);
    }
    else {
      values['id'] = props.match.params.id;
      //   props.updateEntity(values);
    }
  }




  return (
    <div style={{ padding: "8%" }}>
      <Grid container spacing={3}  >
        <Grid item xs={8}>
          {isNew ? (
            <h2 >
              Saisie un nouveau blog

            </h2>
          ) :
            <h2 >
              Modifier blog
            </h2>
          }
          <Grid container item xs={12} style={{ marginTop: '2%' }}>
            <Grid container item xs={12} spacing={3} style={{ marginTop: '2%' }}>
              <Grid container item xs={11} justify="center"  >
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>

                  <Grid container spacing={9} xs={11} sm={12}>



                    <Grid container justify="center" item xs={12} md={6} >
                      <TextField
                        style={{ width: '100%' }}
                        id="name"
                        label="Name"
                        type="text"
                        {...register('name')}
                      />
                    </Grid>

                    <Grid container justify="center" item xs={12} md={6} >
                      <TextField
                        style={{ width: '100%' }}
                        id="handle"
                        label="Handle"
                        type="text"
                        {...register('handle')}
                       
                      />
                    </Grid>





                  </Grid>
                  <Grid item container style={{ marginTop: '6%' }} xs={12} >
                    <Button tag={Link} id="cancel-save" to="/admin/blog" replace color="info">
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <span className="d-none d-md-inline">
                        Back
                      </span>
                    </Button>
                    &nbsp;
                    <Button color="primary" id="save-entity" type="submit" >
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      Save
                    </Button>
                  </Grid>
                </form>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  blogEntity: storeState.blog.entity,
  loading: storeState.blog.loading,
  fundList: storeState.blog.entities,
  updating: storeState.blog.updating,
  updateSuccess: storeState.blog.updateSuccess,

});

const mapDispatchToProps = {
  getEntity,
  // updateEntity,
  createEntity,
  getAllBlogs,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BlogUpdate);
