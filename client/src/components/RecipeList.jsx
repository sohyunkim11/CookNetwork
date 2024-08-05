/* RecipeList.jsx
레시피 데이터들을 단순 나열하는 레시피리스트 컴포넌트입니다.
*/

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import recipeData from "./Data";


function RecipeList({ category }) {   // category를 props로 받음
  const [recipes, setRecipes] = useState([]);
  const API_URL = 'http://localhost:3000';

  useEffect(() => {   // 컴포넌트가 마운트될 때 fetch 함수 호출
    fetchRecipes();
  }, [category]);   // 카테고리가 바뀔때마다 다시 실행

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/recipes/category/${category}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if(!response.ok) {
        throw new Error((await response.json()).error);
      }
      const result = await response.json();
      console.log(`${category} 레시피 목록 호출 성공`);
      setRecipes(result);
    } catch (e) {
      console.error('Error:', e);
    }
  }

  return (
    <Container className="text-start">
      <h5>{category}: 다양한 레시피를 확인해보세요!</h5>
      <Row lg={5} className="g-4">
        {recipes.map((recipe) => (
        <Col key={recipe.recipe_id}>  
          <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
            <Card style={{ cursor: 'pointer' }}>
            <Card.Img variant="top" src="recipe.recipe_img" />
            <Card.Body>
              <Card.Title>{recipe.recipe_name}

              </Card.Title>
              <Button variant="dark">보러가기</Button>
            </Card.Body>
          </Card>
        </Link>
      </Col>
      ))}
      </Row>
    </Container>
  )
}

export default RecipeList;