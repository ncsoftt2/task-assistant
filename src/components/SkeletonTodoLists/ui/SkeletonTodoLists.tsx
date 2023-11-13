import {Box, Grid, Paper, Skeleton} from "@mui/material";
import * as React from "react";
export const SkeletonTodoLists = () => {
    return (
        <>
            {[1,2,3].map((el) => {
                return (
                    <Grid item sx={{p:1}} md={6} lg={4} sm={6} xs={12} key={el}>
                        <Paper elevation={5} sx={{p: 1,margin:"0 auto"}}>
                            <Box sx={{maxWidth:'300px',margin:'0 auto' }}>
                                <Box sx={{minWidth: '100px',maxWidth:'200px',textAlign:'center',margin:'0 auto'}}>
                                    <Skeleton />
                                </Box>
                                <Box sx={{textAlign:'center',margin:'0 auto'}}>
                                    <Skeleton />
                                </Box>
                                <Skeleton animation="wave" />
                                <Box sx={{textAlign:'center',margin:'0 auto'}}>
                                    <Skeleton />
                                </Box>
                                <Skeleton animation={false} />
                            </Box>
                        </Paper>
                    </Grid>
                )
            })}
        </>
    )
}